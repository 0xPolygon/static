"""Generates taskefinition file for the github workflow to deploy
"""

import argparse
import json
import os
import re
import yaml


class TaskdefCreator:
    """Handles creation of taskdef file for ECS using template"""

    def __init__(self):
        parser = argparse.ArgumentParser(description="Task definition creator")
        parser.add_argument(
            "parameters_file",
            type=str,
            help="Parameters yaml file with required values",
        )
        parser.add_argument(
            "taskdef_template",
            type=str,
            help="Template json file to be used",
            default=".github/taskdefinition_template/taskdef_template.json",
        )
        parser.add_argument(
            "account_number",
            type=str,
            help="AWS account number to be used for deployment"
        )
        self.args = parser.parse_args()
        self.template_data = ""
        self.taskdef_final_file = ""

    def _read_yaml_file(self):
        """Reads yaml file into dictionary from user input"""
        with open(self.args.parameters_file, "r") as file_object:
            try:
                data = yaml.safe_load(file_object)
                return data
            except yaml.YAMLError as error:
                print(f"Error reading YAML file {self.args.parameters_file}: {error}")
                return None

    def _read_template_file(self):
        """Reads template file for data substitution"""
        try:
            with open(self.args.taskdef_template, "r") as file:
                self.template_data = file.read()
        except FileNotFoundError:
            print(f"Error: File '{self.args.taskdef_template}' not found.")
        except IOError as error:
            print(f"Error reading file '{self.args.taskdef_template}': {error}")
        except Exception as error:
            print(f"An unexpected error occurred: {error}")

    def _substitute_env_vars(self, data_read: list):
        """Substitutes value in self.template_data based on env names and values

        Args:
            data_read (list): [{name: value}...] of environment variables for app
        """
        env_values = ""
        env_template = """{
                    "name": "name_sub",
                    "value": "value_sub"
                },
                """
        for env_data in data_read:
            name = env_data.get("name")
            value = env_data.get("value")
            env_values += env_template.replace("name_sub", name).replace(
                "value_sub", value
            )
        env_values = env_values.strip().rstrip(",")
        self.template_data = self.template_data.replace("$env_vars", env_values)

    def _substitute_secret_vars(self, data_read: list):
        """Substitutes value in self.template_data based on secret names

        Args:
            data_read (list): [{name: value}...] of environment variables for app
        """
        secret_str = ""
        secret_template = """{
                    "valueFrom": "arn:aws:ssm:$region:$account_number:parameter/$app_name/$secret_name",
                    "name": "$secret_name"
                },"""
        for secret in data_read:
            secret_str += secret_template.replace("$secret_name", secret)
        secret_str = secret_str.strip().rstrip(",")
        self.template_data = self.template_data.replace("$secret_vars", secret_str)

    def _subtitute_data(self, user_data: dict, sub: str):
        """Subtitutes data in self.template_data based on user specified data

        Args:
            user_data (dict): Data read from user defined yaml file
            sub (str): Element to be searched for and substituted
        """
        data_read = str(user_data.get(sub, "")).strip()
        self.template_data = self.template_data.replace(f"${sub}", data_read)
        if sub == "app_name":
            self.taskdef_final_file = data_read

    def _print_secrets_to_create(self, json_data_str: str):
        """Prints secrets to be created for systems manager parameter store

        Args:
            json_data_str (str): File data for taskdef file
        """
        for line in json_data_str.split("\n"):
            if "valueFrom" in line:
                secret = (
                    line.split('"valueFrom": "arn:aws:ssm:', 1)[1].strip().rstrip('",')
                )

                print(f"Update SSM for secret: {secret}")

    def create_taskdef_file(self):
        """Create a taskdef file based on the app name"""
        directory = os.path.dirname(self.args.taskdef_template)
        file_path = os.sep.join([directory, self.taskdef_final_file]) + ".json"
        self.template_data = self.template_data.replace("\n", "")
        self.template_data = re.sub(r"\s+", " ", self.template_data)
        json_data_dict = json.loads(self.template_data)
        json_data_str = json.dumps(json_data_dict, indent=2)
        self._print_secrets_to_create(json_data_str)
        with open(file_path, "w") as file_object:
            json.dump(json_data_dict, file_object, ensure_ascii=False, indent=2)
        print(f"Create file {file_path}")

    def substitute_values(self):
        """Substitutes values taskdef template to generate a new file
        Expected strings in template to be replaced for values are:
        region, account_number, hostport, containerport, app_name,
        role, environment, iac, team_name, memory, cpu, env_vars, secret_vars
        """
        self._read_template_file()
        user_data = self._read_yaml_file()
        expected_sub = [
            "region",
            "account_number",
            "hostport",
            "containerport",
            "app_name",
            "role",
            "environment",
            "iac",
            "team_name",
            "memory",
            "cpu",
        ]
        if user_data is not None:
            user_data["account_number"] = self.args.account_number
        self._substitute_env_vars(user_data.get("env_vars", []))
        self._substitute_secret_vars(user_data.get("secret_vars", []))
        [user_data.pop(key) for key in ["env_vars", "secret_vars"] if key in user_data]
        for sub in expected_sub:
            self._subtitute_data(user_data, sub)


if __name__ == "__main__":
    TASKDEF_CREATOR = TaskdefCreator()
    TASKDEF_CREATOR.substitute_values()
    TASKDEF_CREATOR.create_taskdef_file()
