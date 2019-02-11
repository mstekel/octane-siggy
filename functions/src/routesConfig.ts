const config = {
    "defines": {
        "constants": {
            "name": "Octane",
            "description": "A Node.JS module which provide an object oriented wrapper for the HPE ALM Octane API",
            "protocol": "https",
            "host": "",
            "port": "443"
        },
        "params": {
            "text_search": {
                "type": "string",
                "required": false,
                "description": "elastic search"
            },
            "limit": {
                "type": "integer",
                "required": false,
                "description": "The number of instances to return in each page from the results of the query."
            },
            "offset": {
                "type": "integer",
                "required": false,
                "description": "The first position to return from the results of the query. The default is 0."
            },
            "fields": {
                "type": "string",
                "required": false,
                "description": "The fields to be returned in the results of the query."
            },
            "order_by": {
                "type": "string",
                "required": false,
                "description": "Sorts the entities returned in the results of the query."
            },
            "query": {
                "type": "query",
                "required": false,
                "description": "Filter entities returned in the results of the query."
            },
            "id": {
                "type": "integer",
                "required": true,
                "description": "The id."
            },
            "filename": {
                "type": "string",
                "required": true,
                "description": "Used for attachments when needing to specify the attachment name"
            }
        }
    },
    "metadata": {
        "get-entities": {
            "url": "/metadata/entities",
            "method": "GET",
            "params": {
                "$query": null
            },
            "description": "Gets entities list"
        },
        "get-fields": {
            "url": "/metadata/fields",
            "method": "GET",
            "params": {
                "$query": null
            },
            "description": "Get fields list"
        }
    },
    "severities": {
        "get-all": {
            "url": "/list_nodes?query=\"list_root EQ {id EQ ^list_node.severity^}\"&order_by=id",
            "method": "GET",
            "params": {},
            "description": "Gets severities list"
        }
    },
    "priorities": {
        "get-all": {
            "url": "/list_nodes?query=\"list_root EQ {id EQ ^list_node.priority^}\"&order_by=id",
            "method": "GET",
            "params": {},
            "description": "Gets priorities list"
        }
    },
    "attachments": {
        "create": {
            "url": "/attachments",
            "method": "POST",
            "content-type": "multipart/form-data",
            "params": {
                "owner_release": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner release",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "owner_work_item": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner work item",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "quality_story"
                            },
                            {
                                "type": "theme"
                            },
                            {
                                "type": "work_item_root"
                            },
                            {
                                "type": "feature"
                            },
                            {
                                "type": "defect"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                },
                "owner_test": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner test",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "gherkin_test"
                            },
                            {
                                "type": "test_manual"
                            },
                            {
                                "type": "test_suite"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "string",
                    "required": false,
                    "description": "Description",
                    "max_length": 2000
                },
                "owner_milestone": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner milestone",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "milestone"
                            }
                        ]
                    }
                },
                "file": {
                    "type": "file",
                    "required": true,
                    "description": "The absolute file path"
                }
            },
            "description": "Create a single attachment."
        },
        "download": {
            "url": "/attachments/:id/:filename",
            "method": "GET",
            "accept": "application/octet-stream",
            "params": {
                "$id": null,
                "$filename": null
            },
            "description": "Downloads a single attachment."
        },
        "get-all": {
            "url": "/attachments",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets attachments list."
        },
        "get": {
            "url": "/attachments/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single attachment."
        },
        "create-bulk": {
            "url": "/attachments",
            "method": "POST",
            "params": {
                "owner_task": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner task",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "task"
                            }
                        ]
                    }
                },
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "owner_work_item": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner work item",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "quality_story"
                            },
                            {
                                "type": "epic"
                            },
                            {
                                "type": "work_item_root"
                            },
                            {
                                "type": "feature"
                            },
                            {
                                "type": "defect"
                            }
                        ]
                    }
                },
                "owner_test": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner test",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "test_manual"
                            },
                            {
                                "type": "gherkin_test"
                            },
                            {
                                "type": "test_automated"
                            },
                            {
                                "type": "test_suite"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "string",
                    "required": false,
                    "description": "Description",
                    "max_length": 2000
                },
                "owner_import": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner import",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "import"
                            }
                        ]
                    }
                },
                "owner_run_step": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner run step",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "run_step"
                            }
                        ]
                    }
                },
                "owner_run": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner run",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "run_manual"
                            }
                        ]
                    }
                },
                "owner_background_task": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner background task",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "background_task"
                            }
                        ]
                    }
                },
                "owner_release": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner release",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                },
                "owner_requirement": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner requirement",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "requirement_document"
                            },
                            {
                                "type": "requirement_folder"
                            }
                        ]
                    }
                },
                "owner_milestone": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner milestone",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "milestone"
                            }
                        ]
                    }
                }
            },
            "description": "Create multiple attachment."
        },
        "update": {
            "url": "/attachments/:id",
            "method": "PUT",
            "params": {
                "description": {
                    "type": "string",
                    "required": false,
                    "description": "Description",
                    "max_length": 2000
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "$id": null
            },
            "description": "Update a single attachment."
        },
        "update-bulk": {
            "url": "/attachments",
            "method": "PUT",
            "params": {
                "description": {
                    "type": "string",
                    "required": false,
                    "description": "Description",
                    "max_length": 2000
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "$id": null
            },
            "description": "Update multiple attachment."
        },
        "delete": {
            "url": "/attachments/:id",
            "method": "DELETE",
            "params": {
                "$id": null
            },
            "description": "Delete a single attachment."
        }
    },
    "comments": {
        "get-all": {
            "url": "/comments",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets comments list."
        },
        "get": {
            "url": "/comments/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single comment."
        },
        "create": {
            "url": "/comments",
            "method": "POST",
            "params": {
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "owner_work_item": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner work item",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "quality_story"
                            },
                            {
                                "type": "epic"
                            },
                            {
                                "type": "work_item_root"
                            },
                            {
                                "type": "feature"
                            },
                            {
                                "type": "defect"
                            }
                        ]
                    }
                },
                "owner_test": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner test",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "test_manual"
                            },
                            {
                                "type": "gherkin_test"
                            },
                            {
                                "type": "test_automated"
                            },
                            {
                                "type": "test_suite"
                            }
                        ]
                    }
                },
                "owner_run": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner run",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "run_suite"
                            },
                            {
                                "type": "run_automated"
                            },
                            {
                                "type": "run_manual"
                            },
                            {
                                "type": "gherkin_automated_run"
                            }
                        ]
                    }
                },
                "text": {
                    "type": "memo",
                    "required": false,
                    "description": "Text"
                },
                "owner_requirement": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner requirement",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "requirement_document"
                            },
                            {
                                "type": "requirement_folder"
                            }
                        ]
                    }
                }
            },
            "description": "Create a single comment."
        },
        "create-bulk": {
            "url": "/comments",
            "method": "POST",
            "params": {
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "owner_work_item": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner work item",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "quality_story"
                            },
                            {
                                "type": "epic"
                            },
                            {
                                "type": "work_item_root"
                            },
                            {
                                "type": "feature"
                            },
                            {
                                "type": "defect"
                            }
                        ]
                    }
                },
                "owner_test": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner test",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "test_manual"
                            },
                            {
                                "type": "gherkin_test"
                            },
                            {
                                "type": "test_automated"
                            },
                            {
                                "type": "test_suite"
                            }
                        ]
                    }
                },
                "owner_run": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner run",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "run_suite"
                            },
                            {
                                "type": "run_automated"
                            },
                            {
                                "type": "run_manual"
                            },
                            {
                                "type": "gherkin_automated_run"
                            }
                        ]
                    }
                },
                "text": {
                    "type": "memo",
                    "required": false,
                    "description": "Text"
                },
                "owner_requirement": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner requirement",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "requirement_document"
                            },
                            {
                                "type": "requirement_folder"
                            }
                        ]
                    }
                }
            },
            "description": "Create multiple comment."
        },
        "update": {
            "url": "/comments/:id",
            "method": "PUT",
            "params": {
                "text": {
                    "type": "memo",
                    "required": false,
                    "description": "Text"
                },
                "$id": null
            },
            "description": "Update a single comment."
        },
        "update-bulk": {
            "url": "/comments",
            "method": "PUT",
            "params": {
                "text": {
                    "type": "memo",
                    "required": false,
                    "description": "Text"
                },
                "$id": null
            },
            "description": "Update multiple comment."
        },
        "delete": {
            "url": "/comments/:id",
            "method": "DELETE",
            "params": {
                "$id": null
            },
            "description": "Delete a single comment."
        }
    },
    "test manuals": {
        "get-all": {
            "url": "/manual_tests",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets test manuals list."
        },
        "get": {
            "url": "/manual_tests/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single test manual."
        },
        "create": {
            "url": "/manual_tests",
            "method": "POST",
            "params": {
                "covered_content": {
                    "type": "reference",
                    "required": false,
                    "description": "Backlog Coverage",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "backlog_coverage": {
                    "type": "reference",
                    "required": false,
                    "description": "Backlog Coverage",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "run_set_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Run set",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "28rxlvzmx9ppi9oy1kk4j96p3",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "phase": {
                    "type": "reference",
                    "required": true,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "product_areas": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "application_modules": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "estimated_duration": {
                    "type": "integer",
                    "required": false,
                    "description": "Estimated duration (minutes)",
                    "min_value": 1,
                    "max_value": 7000
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                },
                "automation_status": {
                    "type": "reference",
                    "required": false,
                    "description": "Automation status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.automation_status",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "attachments": {
                    "type": "reference",
                    "required": false,
                    "description": "Attachments",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "attachment"
                            }
                        ]
                    }
                },
                "team_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Team",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "team"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "designer": {
                    "type": "reference",
                    "required": false,
                    "description": "Designer",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "covered_requirement": {
                    "type": "reference",
                    "required": false,
                    "description": "Covered requirement",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "requirement_document"
                            }
                        ]
                    }
                },
                "test_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Test type",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "list_node.test_type",
                                "type": "list_node"
                            }
                        ]
                    }
                }
            },
            "description": "Create a single test manual."
        },
        "create-bulk": {
            "url": "/manual_tests",
            "method": "POST",
            "params": {
                "covered_content": {
                    "type": "reference",
                    "required": false,
                    "description": "Backlog Coverage",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "backlog_coverage": {
                    "type": "reference",
                    "required": false,
                    "description": "Backlog Coverage",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "run_set_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Run set",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "28rxlvzmx9ppi9oy1kk4j96p3",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "phase": {
                    "type": "reference",
                    "required": true,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "product_areas": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "application_modules": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "estimated_duration": {
                    "type": "integer",
                    "required": false,
                    "description": "Estimated duration (minutes)",
                    "min_value": 1,
                    "max_value": 7000
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                },
                "automation_status": {
                    "type": "reference",
                    "required": false,
                    "description": "Automation status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.automation_status",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "attachments": {
                    "type": "reference",
                    "required": false,
                    "description": "Attachments",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "attachment"
                            }
                        ]
                    }
                },
                "team_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Team",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "team"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "designer": {
                    "type": "reference",
                    "required": false,
                    "description": "Designer",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "covered_requirement": {
                    "type": "reference",
                    "required": false,
                    "description": "Covered requirement",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "requirement_document"
                            }
                        ]
                    }
                },
                "test_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Test type",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "list_node.test_type",
                                "type": "list_node"
                            }
                        ]
                    }
                }
            },
            "description": "Create multiple test manual."
        },
        "update": {
            "url": "/manual_tests/:id",
            "method": "PUT",
            "params": {
                "covered_content": {
                    "type": "reference",
                    "required": false,
                    "description": "Backlog Coverage",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "backlog_coverage": {
                    "type": "reference",
                    "required": false,
                    "description": "Backlog Coverage",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "run_set_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Run set",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "28rxlvzmx9ppi9oy1kk4j96p3",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "phase": {
                    "type": "reference",
                    "required": false,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "product_areas": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "application_modules": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "estimated_duration": {
                    "type": "integer",
                    "required": false,
                    "description": "Estimated duration (minutes)",
                    "min_value": 1,
                    "max_value": 7000
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "automation_status": {
                    "type": "reference",
                    "required": false,
                    "description": "Automation status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.automation_status",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "team_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Team",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "team"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "designer": {
                    "type": "reference",
                    "required": false,
                    "description": "Designer",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "covered_requirement": {
                    "type": "reference",
                    "required": false,
                    "description": "Covered requirement",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "requirement_document"
                            }
                        ]
                    }
                },
                "test_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Test type",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "list_node.test_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "$id": null
            },
            "description": "Update a single test manual."
        },
        "update-bulk": {
            "url": "/manual_tests",
            "method": "PUT",
            "params": {
                "covered_content": {
                    "type": "reference",
                    "required": false,
                    "description": "Backlog Coverage",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "backlog_coverage": {
                    "type": "reference",
                    "required": false,
                    "description": "Backlog Coverage",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "run_set_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Run set",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "28rxlvzmx9ppi9oy1kk4j96p3",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "phase": {
                    "type": "reference",
                    "required": false,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "product_areas": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "application_modules": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "estimated_duration": {
                    "type": "integer",
                    "required": false,
                    "description": "Estimated duration (minutes)",
                    "min_value": 1,
                    "max_value": 7000
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "automation_status": {
                    "type": "reference",
                    "required": false,
                    "description": "Automation status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.automation_status",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "team_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Team",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "team"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "designer": {
                    "type": "reference",
                    "required": false,
                    "description": "Designer",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "covered_requirement": {
                    "type": "reference",
                    "required": false,
                    "description": "Covered requirement",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "requirement_document"
                            }
                        ]
                    }
                },
                "test_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Test type",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "list_node.test_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "$id": null
            },
            "description": "Update multiple test manual."
        },
        "delete": {
            "url": "/manual_tests/:id",
            "method": "DELETE",
            "params": {
                "$id": null
            },
            "description": "Delete a single test manual."
        }
    },
    "test suite link to tests": {
        "get-all": {
            "url": "/test_suite_link_to_tests",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets test suite link to tests list."
        },
        "get": {
            "url": "/test_suite_link_to_tests/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single test suite link to test."
        },
        "create": {
            "url": "/test_suite_link_to_tests",
            "method": "POST",
            "params": {
                "subtype": {
                    "type": "string",
                    "required": false,
                    "description": "Subtype",
                    "max_length": 255
                },
                "test_suite": {
                    "type": "reference",
                    "required": true,
                    "description": "Test suite",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "test_suite"
                            }
                        ]
                    }
                },
                "test": {
                    "type": "reference",
                    "required": true,
                    "description": "Test",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "test_manual"
                            },
                            {
                                "type": "gherkin_test"
                            },
                            {
                                "type": "test_automated"
                            }
                        ]
                    }
                },
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                }
            },
            "description": "Create a single test suite link to test."
        },
        "create-bulk": {
            "url": "/test_suite_link_to_tests",
            "method": "POST",
            "params": {
                "subtype": {
                    "type": "string",
                    "required": false,
                    "description": "Subtype",
                    "max_length": 255
                },
                "test_suite": {
                    "type": "reference",
                    "required": true,
                    "description": "Test suite",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "test_suite"
                            }
                        ]
                    }
                },
                "test": {
                    "type": "reference",
                    "required": true,
                    "description": "Test",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "test_manual"
                            },
                            {
                                "type": "gherkin_test"
                            },
                            {
                                "type": "test_automated"
                            }
                        ]
                    }
                },
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                }
            },
            "description": "Create multiple test suite link to test."
        },
        "update": {
            "url": "/test_suite_link_to_tests/:id",
            "method": "PUT",
            "params": {
                "$id": null
            },
            "description": "Update a single test suite link to test."
        },
        "update-bulk": {
            "url": "/test_suite_link_to_tests",
            "method": "PUT",
            "params": {
                "$id": null
            },
            "description": "Update multiple test suite link to test."
        },
        "delete": {
            "url": "/test_suite_link_to_tests/:id",
            "method": "DELETE",
            "params": {
                "$id": null
            },
            "description": "Delete a single test suite link to test."
        }
    },
    "test suites": {
        "get-all": {
            "url": "/test_suites",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets test suites list."
        },
        "get": {
            "url": "/test_suites/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single test suite."
        },
        "create": {
            "url": "/test_suites",
            "method": "POST",
            "params": {
                "attachments": {
                    "type": "reference",
                    "required": false,
                    "description": "Attachments",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "attachment"
                            }
                        ]
                    }
                },
                "covered_content": {
                    "type": "reference",
                    "required": false,
                    "description": "Backlog Coverage",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "backlog_coverage": {
                    "type": "reference",
                    "required": false,
                    "description": "Backlog Coverage",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "product_areas": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "application_modules": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "designer": {
                    "type": "reference",
                    "required": false,
                    "description": "Designer",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "covered_requirement": {
                    "type": "reference",
                    "required": false,
                    "description": "Covered requirement",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "requirement_document"
                            }
                        ]
                    }
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "test_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Test type",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "list_node.test_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "modified_by": {
                    "type": "reference",
                    "required": false,
                    "description": "Modified by",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                }
            },
            "description": "Create a single test suite."
        },
        "create-bulk": {
            "url": "/test_suites",
            "method": "POST",
            "params": {
                "attachments": {
                    "type": "reference",
                    "required": false,
                    "description": "Attachments",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "attachment"
                            }
                        ]
                    }
                },
                "covered_content": {
                    "type": "reference",
                    "required": false,
                    "description": "Backlog Coverage",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "backlog_coverage": {
                    "type": "reference",
                    "required": false,
                    "description": "Backlog Coverage",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "product_areas": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "application_modules": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "designer": {
                    "type": "reference",
                    "required": false,
                    "description": "Designer",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "covered_requirement": {
                    "type": "reference",
                    "required": false,
                    "description": "Covered requirement",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "requirement_document"
                            }
                        ]
                    }
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "test_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Test type",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "list_node.test_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "modified_by": {
                    "type": "reference",
                    "required": false,
                    "description": "Modified by",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                }
            },
            "description": "Create multiple test suite."
        },
        "update": {
            "url": "/test_suites/:id",
            "method": "PUT",
            "params": {
                "covered_content": {
                    "type": "reference",
                    "required": false,
                    "description": "Backlog Coverage",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "backlog_coverage": {
                    "type": "reference",
                    "required": false,
                    "description": "Backlog Coverage",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "product_areas": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "application_modules": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "designer": {
                    "type": "reference",
                    "required": false,
                    "description": "Designer",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "covered_requirement": {
                    "type": "reference",
                    "required": false,
                    "description": "Covered requirement",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "requirement_document"
                            }
                        ]
                    }
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "test_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Test type",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "list_node.test_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "modified_by": {
                    "type": "reference",
                    "required": false,
                    "description": "Modified by",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "$id": null
            },
            "description": "Update a single test suite."
        },
        "update-bulk": {
            "url": "/test_suites",
            "method": "PUT",
            "params": {
                "covered_content": {
                    "type": "reference",
                    "required": false,
                    "description": "Backlog Coverage",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "backlog_coverage": {
                    "type": "reference",
                    "required": false,
                    "description": "Backlog Coverage",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "product_areas": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "application_modules": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "designer": {
                    "type": "reference",
                    "required": false,
                    "description": "Designer",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "covered_requirement": {
                    "type": "reference",
                    "required": false,
                    "description": "Covered requirement",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "requirement_document"
                            }
                        ]
                    }
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "test_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Test type",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "list_node.test_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "modified_by": {
                    "type": "reference",
                    "required": false,
                    "description": "Modified by",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "$id": null
            },
            "description": "Update multiple test suite."
        },
        "delete": {
            "url": "/test_suites/:id",
            "method": "DELETE",
            "params": {
                "$id": null
            },
            "description": "Delete a single test suite."
        }
    },
    "taxonomy nodes": {
        "get-all": {
            "url": "/taxonomy_nodes",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets taxonomy nodes list."
        },
        "get": {
            "url": "/taxonomy_nodes/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single taxonomy node."
        }
    },
    "team sprints": {
        "get-all": {
            "url": "/team_sprints",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets team sprints list."
        },
        "get": {
            "url": "/team_sprints/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single team sprint."
        },
        "update": {
            "url": "/team_sprints/:id",
            "method": "PUT",
            "params": {
                "to_improve": {
                    "type": "memo",
                    "required": false,
                    "description": "To improve"
                },
                "expected_velocity": {
                    "type": "integer",
                    "required": false,
                    "description": "Expected velocity",
                    "min_value": 0,
                    "max_value": 9007199254740991
                },
                "to_preserve": {
                    "type": "memo",
                    "required": false,
                    "description": "What went well"
                },
                "$id": null
            },
            "description": "Update a single team sprint."
        },
        "update-bulk": {
            "url": "/team_sprints",
            "method": "PUT",
            "params": {
                "to_improve": {
                    "type": "memo",
                    "required": false,
                    "description": "To improve"
                },
                "expected_velocity": {
                    "type": "integer",
                    "required": false,
                    "description": "Expected velocity",
                    "min_value": 0,
                    "max_value": 9007199254740991
                },
                "to_preserve": {
                    "type": "memo",
                    "required": false,
                    "description": "What went well"
                },
                "$id": null
            },
            "description": "Update multiple team sprint."
        }
    },
    "runs": {
        "get-all": {
            "url": "/runs",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets runs list."
        },
        "get": {
            "url": "/runs/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single run."
        }
    },
    "work item roots": {
        "get-all": {
            "url": "/work_item_roots",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets work item roots list."
        },
        "get": {
            "url": "/work_item_roots/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single work item root."
        }
    },
    "requirements": {
        "get-all": {
            "url": "/requirements",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets requirements list."
        },
        "get": {
            "url": "/requirements/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single requirement."
        },
        "update": {
            "url": "/requirements/:id",
            "method": "PUT",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": false,
                    "description": "Parent",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "requirement_document"
                            },
                            {
                                "type": "requirement_folder"
                            },
                            {
                                "type": "requirement_root"
                            }
                        ]
                    }
                },
                "ordering": {
                    "type": "object",
                    "required": false,
                    "description": "Ordering"
                },
                "release": {
                    "type": "reference",
                    "required": false,
                    "description": "Release",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "priority_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Priority",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.priority",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "phase": {
                    "type": "reference",
                    "required": false,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "related_from_requirements": {
                    "type": "reference",
                    "required": false,
                    "description": "Related from requirements",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "requirement_document"
                            }
                        ]
                    }
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "$id": null
            },
            "description": "Update a single requirement."
        },
        "update-bulk": {
            "url": "/requirements",
            "method": "PUT",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": false,
                    "description": "Parent",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "requirement_document"
                            },
                            {
                                "type": "requirement_folder"
                            },
                            {
                                "type": "requirement_root"
                            }
                        ]
                    }
                },
                "ordering": {
                    "type": "object",
                    "required": false,
                    "description": "Ordering"
                },
                "release": {
                    "type": "reference",
                    "required": false,
                    "description": "Release",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "priority_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Priority",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.priority",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "phase": {
                    "type": "reference",
                    "required": false,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "related_from_requirements": {
                    "type": "reference",
                    "required": false,
                    "description": "Related from requirements",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "requirement_document"
                            }
                        ]
                    }
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "$id": null
            },
            "description": "Update multiple requirement."
        }
    },
    "taxonomy item nodes": {
        "get-all": {
            "url": "/taxonomy_item_nodes",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets taxonomy item nodes list."
        },
        "get": {
            "url": "/taxonomy_item_nodes/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single taxonomy item node."
        }
    },
    "run automateds": {
        "get-all": {
            "url": "/automated_runs",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets run automateds list."
        },
        "get": {
            "url": "/automated_runs/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single run automated."
        }
    },
    "features": {
        "get-all": {
            "url": "/features",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets features list."
        },
        "get": {
            "url": "/features/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single feature."
        },
        "create": {
            "url": "/features",
            "method": "POST",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": false,
                    "description": "Epic",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "epic"
                            },
                            {
                                "type": "work_item_root"
                            }
                        ]
                    }
                },
                "release": {
                    "type": "reference",
                    "required": false,
                    "description": "Release",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "ultimate_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Ultimate(legacy)",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "o0mky7d4j4zgeun7qdwl3yqz2",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "doc_owner_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Doc Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "phase": {
                    "type": "reference",
                    "required": true,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "rroe": {
                    "type": "reference",
                    "required": false,
                    "description": "WSJF time RR | OE",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.wsjf_scale_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "doc_phase_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Doc Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "ym7g6pvp3rgg7hx1pnw7k60n5",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "priority": {
                    "type": "reference",
                    "required": false,
                    "description": "Priority",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.priority",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "enhancment_request_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Enhancement Request",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "zwymje62z6e27u478ow5grlqk",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "dev_story_points_udf": {
                    "type": "integer",
                    "required": false,
                    "description": "Dev Story Points Days",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "app_security_status_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "App Security Status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "8gnd60jrddkertzj459odq9xp",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "attachments": {
                    "type": "reference",
                    "required": false,
                    "description": "Attachments",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "attachment"
                            }
                        ]
                    }
                },
                "initial_estimate": {
                    "type": "integer",
                    "required": false,
                    "description": "Initial estimate",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "internal_customer_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Internal Customer(legacy)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "2mk79k1d1ygrzsqk4g71ndxp0",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "ordering": {
                    "type": "object",
                    "required": false,
                    "description": "Ordering"
                },
                "qa_story_points_f": {
                    "type": "integer",
                    "required": false,
                    "description": "QA Story Points Days f(legacy)",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "dev_story_point": {
                    "type": "integer",
                    "required": false,
                    "description": "Dev Story Points Days f(legacy)",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "group_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Group",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "n56edn77jw20ear1woz7xklyw",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "fa_owner_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "FA Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "story_points": {
                    "type": "integer",
                    "required": false,
                    "description": "Story points",
                    "min_value": 0,
                    "max_value": 9007199254740991
                },
                "linked_items2": {
                    "type": "reference",
                    "required": false,
                    "description": "Feature(Trace from)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "feature"
                            },
                            {
                                "type": "defect"
                            }
                        ]
                    }
                },
                "linked_items1": {
                    "type": "reference",
                    "required": false,
                    "description": "Feature(Trace to)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "whats_new": {
                    "type": "string",
                    "required": false,
                    "description": "Whats new(legacy)",
                    "max_length": 255
                },
                "team": {
                    "type": "reference",
                    "required": false,
                    "description": "Team",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "team"
                            }
                        ]
                    }
                },
                "qa_story_points_udf": {
                    "type": "integer",
                    "required": false,
                    "description": "QA Story Points Days",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "time_criticality": {
                    "type": "reference",
                    "required": false,
                    "description": "WSJF time criticality",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.wsjf_scale_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "ltenn_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "L10N",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "zwymje62z6e27u478ow5grlqk",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "business_value": {
                    "type": "reference",
                    "required": false,
                    "description": "WSJF business value",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.wsjf_scale_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "customers_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "7v128zzgmygq5urx3r9wg8lme",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "sprint": {
                    "type": "reference",
                    "required": false,
                    "description": "Target Sprint",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "sprint"
                            }
                        ]
                    }
                },
                "source_ids_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Source IDs",
                    "max_length": 255
                },
                "technical_lead_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Technical lead",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "customer_type_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer Type(legacy)",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "673yvl3rkkpkphknnogjlvowx",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "test": {
                    "type": "reference",
                    "required": false,
                    "description": "Test",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "test_manual"
                            },
                            {
                                "type": "gherkin_test"
                            },
                            {
                                "type": "test_automated"
                            },
                            {
                                "type": "test_suite"
                            }
                        ]
                    }
                },
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "product_areas": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "application_modules": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "ltenn_phase_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "L10N Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "65j4qw5245oy3t2md6g37qg28",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "exposed_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Exposed",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "rp1jxp1zrvm9wf7k7jr4exk2d",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                },
                "performance_owner_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Performance Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "app_security_risk_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "App Security Risk",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "w0kp962jq45zt0rzpn86vmn2r",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "api_doc_status_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "API Doc Status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "qwlrdkp6k4r8zazz6x1pg06zn",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "whats_new_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Whats new",
                    "max_length": 255
                },
                "ticket_number_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Ticket Number(legacy)",
                    "max_length": 255
                },
                "qa_owner_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "QA Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "requirements": {
                    "type": "reference",
                    "required": false,
                    "description": "Requirements",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "requirement_document"
                            }
                        ]
                    }
                },
                "mvp_udf": {
                    "type": "boolean",
                    "required": false,
                    "description": "MVP"
                },
                "depends_on_ids_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Depends on IDs",
                    "max_length": 255
                },
                "customer_contact_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer contact(legacy)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "feature_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Feature type",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.feature_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "push_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Push - obsolete",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "wlom7krm3nknoi3ooqorqy8ex",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "performance_status_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Performance Status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "g97o48vko51qqcwv0d5yz2nm3",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "job_size": {
                    "type": "integer",
                    "required": false,
                    "description": "WSJF job size",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "customer_email_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Customer Email",
                    "max_length": 255
                },
                "quality_status_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Quality Status",
                    "max_length": 255
                }
            },
            "description": "Create a single feature."
        },
        "create-bulk": {
            "url": "/features",
            "method": "POST",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": false,
                    "description": "Epic",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "epic"
                            },
                            {
                                "type": "work_item_root"
                            }
                        ]
                    }
                },
                "release": {
                    "type": "reference",
                    "required": false,
                    "description": "Release",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "ultimate_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Ultimate(legacy)",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "o0mky7d4j4zgeun7qdwl3yqz2",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "doc_owner_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Doc Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "phase": {
                    "type": "reference",
                    "required": true,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "rroe": {
                    "type": "reference",
                    "required": false,
                    "description": "WSJF time RR | OE",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.wsjf_scale_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "doc_phase_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Doc Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "ym7g6pvp3rgg7hx1pnw7k60n5",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "priority": {
                    "type": "reference",
                    "required": false,
                    "description": "Priority",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.priority",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "enhancment_request_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Enhancement Request",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "zwymje62z6e27u478ow5grlqk",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "dev_story_points_udf": {
                    "type": "integer",
                    "required": false,
                    "description": "Dev Story Points Days",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "app_security_status_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "App Security Status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "8gnd60jrddkertzj459odq9xp",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "attachments": {
                    "type": "reference",
                    "required": false,
                    "description": "Attachments",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "attachment"
                            }
                        ]
                    }
                },
                "initial_estimate": {
                    "type": "integer",
                    "required": false,
                    "description": "Initial estimate",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "internal_customer_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Internal Customer(legacy)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "2mk79k1d1ygrzsqk4g71ndxp0",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "ordering": {
                    "type": "object",
                    "required": false,
                    "description": "Ordering"
                },
                "qa_story_points_f": {
                    "type": "integer",
                    "required": false,
                    "description": "QA Story Points Days f(legacy)",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "dev_story_point": {
                    "type": "integer",
                    "required": false,
                    "description": "Dev Story Points Days f(legacy)",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "group_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Group",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "n56edn77jw20ear1woz7xklyw",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "fa_owner_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "FA Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "story_points": {
                    "type": "integer",
                    "required": false,
                    "description": "Story points",
                    "min_value": 0,
                    "max_value": 9007199254740991
                },
                "linked_items2": {
                    "type": "reference",
                    "required": false,
                    "description": "Feature(Trace from)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "feature"
                            },
                            {
                                "type": "defect"
                            }
                        ]
                    }
                },
                "linked_items1": {
                    "type": "reference",
                    "required": false,
                    "description": "Feature(Trace to)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "whats_new": {
                    "type": "string",
                    "required": false,
                    "description": "Whats new(legacy)",
                    "max_length": 255
                },
                "team": {
                    "type": "reference",
                    "required": false,
                    "description": "Team",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "team"
                            }
                        ]
                    }
                },
                "qa_story_points_udf": {
                    "type": "integer",
                    "required": false,
                    "description": "QA Story Points Days",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "time_criticality": {
                    "type": "reference",
                    "required": false,
                    "description": "WSJF time criticality",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.wsjf_scale_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "ltenn_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "L10N",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "zwymje62z6e27u478ow5grlqk",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "business_value": {
                    "type": "reference",
                    "required": false,
                    "description": "WSJF business value",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.wsjf_scale_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "customers_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "7v128zzgmygq5urx3r9wg8lme",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "sprint": {
                    "type": "reference",
                    "required": false,
                    "description": "Target Sprint",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "sprint"
                            }
                        ]
                    }
                },
                "source_ids_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Source IDs",
                    "max_length": 255
                },
                "technical_lead_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Technical lead",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "customer_type_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer Type(legacy)",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "673yvl3rkkpkphknnogjlvowx",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "test": {
                    "type": "reference",
                    "required": false,
                    "description": "Test",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "test_manual"
                            },
                            {
                                "type": "gherkin_test"
                            },
                            {
                                "type": "test_automated"
                            },
                            {
                                "type": "test_suite"
                            }
                        ]
                    }
                },
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "product_areas": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "application_modules": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "ltenn_phase_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "L10N Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "65j4qw5245oy3t2md6g37qg28",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "exposed_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Exposed",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "rp1jxp1zrvm9wf7k7jr4exk2d",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                },
                "performance_owner_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Performance Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "app_security_risk_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "App Security Risk",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "w0kp962jq45zt0rzpn86vmn2r",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "api_doc_status_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "API Doc Status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "qwlrdkp6k4r8zazz6x1pg06zn",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "whats_new_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Whats new",
                    "max_length": 255
                },
                "ticket_number_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Ticket Number(legacy)",
                    "max_length": 255
                },
                "qa_owner_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "QA Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "requirements": {
                    "type": "reference",
                    "required": false,
                    "description": "Requirements",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "requirement_document"
                            }
                        ]
                    }
                },
                "mvp_udf": {
                    "type": "boolean",
                    "required": false,
                    "description": "MVP"
                },
                "depends_on_ids_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Depends on IDs",
                    "max_length": 255
                },
                "customer_contact_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer contact(legacy)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "feature_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Feature type",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.feature_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "push_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Push - obsolete",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "wlom7krm3nknoi3ooqorqy8ex",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "performance_status_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Performance Status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "g97o48vko51qqcwv0d5yz2nm3",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "job_size": {
                    "type": "integer",
                    "required": false,
                    "description": "WSJF job size",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "customer_email_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Customer Email",
                    "max_length": 255
                },
                "quality_status_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Quality Status",
                    "max_length": 255
                }
            },
            "description": "Create multiple feature."
        },
        "update": {
            "url": "/features/:id",
            "method": "PUT",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": false,
                    "description": "Epic",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "epic"
                            },
                            {
                                "type": "work_item_root"
                            }
                        ]
                    }
                },
                "release": {
                    "type": "reference",
                    "required": false,
                    "description": "Release",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "ultimate_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Ultimate(legacy)",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "o0mky7d4j4zgeun7qdwl3yqz2",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "doc_owner_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Doc Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "phase": {
                    "type": "reference",
                    "required": false,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "rroe": {
                    "type": "reference",
                    "required": false,
                    "description": "WSJF time RR | OE",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.wsjf_scale_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "doc_phase_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Doc Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "ym7g6pvp3rgg7hx1pnw7k60n5",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "priority": {
                    "type": "reference",
                    "required": false,
                    "description": "Priority",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.priority",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "enhancment_request_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Enhancement Request",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "zwymje62z6e27u478ow5grlqk",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "dev_story_points_udf": {
                    "type": "integer",
                    "required": false,
                    "description": "Dev Story Points Days",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "app_security_status_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "App Security Status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "8gnd60jrddkertzj459odq9xp",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "initial_estimate": {
                    "type": "integer",
                    "required": false,
                    "description": "Initial estimate",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "internal_customer_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Internal Customer(legacy)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "2mk79k1d1ygrzsqk4g71ndxp0",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "ordering": {
                    "type": "object",
                    "required": false,
                    "description": "Ordering"
                },
                "qa_story_points_f": {
                    "type": "integer",
                    "required": false,
                    "description": "QA Story Points Days f(legacy)",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "dev_story_point": {
                    "type": "integer",
                    "required": false,
                    "description": "Dev Story Points Days f(legacy)",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "group_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Group",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "n56edn77jw20ear1woz7xklyw",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "fa_owner_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "FA Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "story_points": {
                    "type": "integer",
                    "required": false,
                    "description": "Story points",
                    "min_value": 0,
                    "max_value": 9007199254740991
                },
                "linked_items2": {
                    "type": "reference",
                    "required": false,
                    "description": "Feature(Trace from)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "feature"
                            },
                            {
                                "type": "defect"
                            }
                        ]
                    }
                },
                "linked_items1": {
                    "type": "reference",
                    "required": false,
                    "description": "Feature(Trace to)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "whats_new": {
                    "type": "string",
                    "required": false,
                    "description": "Whats new(legacy)",
                    "max_length": 255
                },
                "team": {
                    "type": "reference",
                    "required": false,
                    "description": "Team",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "team"
                            }
                        ]
                    }
                },
                "qa_story_points_udf": {
                    "type": "integer",
                    "required": false,
                    "description": "QA Story Points Days",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "time_criticality": {
                    "type": "reference",
                    "required": false,
                    "description": "WSJF time criticality",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.wsjf_scale_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "ltenn_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "L10N",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "zwymje62z6e27u478ow5grlqk",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "business_value": {
                    "type": "reference",
                    "required": false,
                    "description": "WSJF business value",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.wsjf_scale_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "customers_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "7v128zzgmygq5urx3r9wg8lme",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "sprint": {
                    "type": "reference",
                    "required": false,
                    "description": "Target Sprint",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "sprint"
                            }
                        ]
                    }
                },
                "source_ids_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Source IDs",
                    "max_length": 255
                },
                "technical_lead_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Technical lead",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "customer_type_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer Type(legacy)",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "673yvl3rkkpkphknnogjlvowx",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "test": {
                    "type": "reference",
                    "required": false,
                    "description": "Test",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "test_manual"
                            },
                            {
                                "type": "gherkin_test"
                            },
                            {
                                "type": "test_automated"
                            },
                            {
                                "type": "test_suite"
                            }
                        ]
                    }
                },
                "product_areas": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "application_modules": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "ltenn_phase_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "L10N Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "65j4qw5245oy3t2md6g37qg28",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "exposed_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Exposed",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "rp1jxp1zrvm9wf7k7jr4exk2d",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "performance_owner_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Performance Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "app_security_risk_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "App Security Risk",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "w0kp962jq45zt0rzpn86vmn2r",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "api_doc_status_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "API Doc Status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "qwlrdkp6k4r8zazz6x1pg06zn",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "whats_new_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Whats new",
                    "max_length": 255
                },
                "ticket_number_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Ticket Number(legacy)",
                    "max_length": 255
                },
                "qa_owner_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "QA Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "requirements": {
                    "type": "reference",
                    "required": false,
                    "description": "Requirements",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "requirement_document"
                            }
                        ]
                    }
                },
                "mvp_udf": {
                    "type": "boolean",
                    "required": false,
                    "description": "MVP"
                },
                "depends_on_ids_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Depends on IDs",
                    "max_length": 255
                },
                "customer_contact_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer contact(legacy)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "feature_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Feature type",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.feature_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "push_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Push - obsolete",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "wlom7krm3nknoi3ooqorqy8ex",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "performance_status_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Performance Status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "g97o48vko51qqcwv0d5yz2nm3",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "job_size": {
                    "type": "integer",
                    "required": false,
                    "description": "WSJF job size",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "customer_email_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Customer Email",
                    "max_length": 255
                },
                "quality_status_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Quality Status",
                    "max_length": 255
                },
                "$id": null
            },
            "description": "Update a single feature."
        },
        "update-bulk": {
            "url": "/features",
            "method": "PUT",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": false,
                    "description": "Epic",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "epic"
                            },
                            {
                                "type": "work_item_root"
                            }
                        ]
                    }
                },
                "release": {
                    "type": "reference",
                    "required": false,
                    "description": "Release",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "ultimate_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Ultimate(legacy)",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "o0mky7d4j4zgeun7qdwl3yqz2",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "doc_owner_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Doc Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "phase": {
                    "type": "reference",
                    "required": false,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "rroe": {
                    "type": "reference",
                    "required": false,
                    "description": "WSJF time RR | OE",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.wsjf_scale_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "doc_phase_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Doc Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "ym7g6pvp3rgg7hx1pnw7k60n5",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "priority": {
                    "type": "reference",
                    "required": false,
                    "description": "Priority",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.priority",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "enhancment_request_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Enhancement Request",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "zwymje62z6e27u478ow5grlqk",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "dev_story_points_udf": {
                    "type": "integer",
                    "required": false,
                    "description": "Dev Story Points Days",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "app_security_status_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "App Security Status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "8gnd60jrddkertzj459odq9xp",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "initial_estimate": {
                    "type": "integer",
                    "required": false,
                    "description": "Initial estimate",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "internal_customer_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Internal Customer(legacy)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "2mk79k1d1ygrzsqk4g71ndxp0",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "ordering": {
                    "type": "object",
                    "required": false,
                    "description": "Ordering"
                },
                "qa_story_points_f": {
                    "type": "integer",
                    "required": false,
                    "description": "QA Story Points Days f(legacy)",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "dev_story_point": {
                    "type": "integer",
                    "required": false,
                    "description": "Dev Story Points Days f(legacy)",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "group_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Group",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "n56edn77jw20ear1woz7xklyw",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "fa_owner_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "FA Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "story_points": {
                    "type": "integer",
                    "required": false,
                    "description": "Story points",
                    "min_value": 0,
                    "max_value": 9007199254740991
                },
                "linked_items2": {
                    "type": "reference",
                    "required": false,
                    "description": "Feature(Trace from)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "feature"
                            },
                            {
                                "type": "defect"
                            }
                        ]
                    }
                },
                "linked_items1": {
                    "type": "reference",
                    "required": false,
                    "description": "Feature(Trace to)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "whats_new": {
                    "type": "string",
                    "required": false,
                    "description": "Whats new(legacy)",
                    "max_length": 255
                },
                "team": {
                    "type": "reference",
                    "required": false,
                    "description": "Team",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "team"
                            }
                        ]
                    }
                },
                "qa_story_points_udf": {
                    "type": "integer",
                    "required": false,
                    "description": "QA Story Points Days",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "time_criticality": {
                    "type": "reference",
                    "required": false,
                    "description": "WSJF time criticality",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.wsjf_scale_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "ltenn_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "L10N",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "zwymje62z6e27u478ow5grlqk",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "business_value": {
                    "type": "reference",
                    "required": false,
                    "description": "WSJF business value",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.wsjf_scale_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "customers_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "7v128zzgmygq5urx3r9wg8lme",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "sprint": {
                    "type": "reference",
                    "required": false,
                    "description": "Target Sprint",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "sprint"
                            }
                        ]
                    }
                },
                "source_ids_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Source IDs",
                    "max_length": 255
                },
                "technical_lead_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Technical lead",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "customer_type_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer Type(legacy)",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "673yvl3rkkpkphknnogjlvowx",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "test": {
                    "type": "reference",
                    "required": false,
                    "description": "Test",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "test_manual"
                            },
                            {
                                "type": "gherkin_test"
                            },
                            {
                                "type": "test_automated"
                            },
                            {
                                "type": "test_suite"
                            }
                        ]
                    }
                },
                "product_areas": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "application_modules": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "ltenn_phase_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "L10N Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "65j4qw5245oy3t2md6g37qg28",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "exposed_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Exposed",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "rp1jxp1zrvm9wf7k7jr4exk2d",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "performance_owner_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Performance Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "app_security_risk_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "App Security Risk",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "w0kp962jq45zt0rzpn86vmn2r",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "api_doc_status_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "API Doc Status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "qwlrdkp6k4r8zazz6x1pg06zn",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "whats_new_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Whats new",
                    "max_length": 255
                },
                "ticket_number_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Ticket Number(legacy)",
                    "max_length": 255
                },
                "qa_owner_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "QA Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "requirements": {
                    "type": "reference",
                    "required": false,
                    "description": "Requirements",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "requirement_document"
                            }
                        ]
                    }
                },
                "mvp_udf": {
                    "type": "boolean",
                    "required": false,
                    "description": "MVP"
                },
                "depends_on_ids_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Depends on IDs",
                    "max_length": 255
                },
                "customer_contact_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer contact(legacy)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "feature_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Feature type",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.feature_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "push_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Push - obsolete",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "wlom7krm3nknoi3ooqorqy8ex",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "performance_status_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Performance Status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "g97o48vko51qqcwv0d5yz2nm3",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "job_size": {
                    "type": "integer",
                    "required": false,
                    "description": "WSJF job size",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "customer_email_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Customer Email",
                    "max_length": 255
                },
                "quality_status_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Quality Status",
                    "max_length": 255
                },
                "$id": null
            },
            "description": "Update multiple feature."
        },
        "delete": {
            "url": "/features/:id",
            "method": "DELETE",
            "params": {
                "$id": null
            },
            "description": "Delete a single feature."
        }
    },
    "run manuals": {
        "get-all": {
            "url": "/manual_runs",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets run manuals list."
        },
        "get": {
            "url": "/manual_runs/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single run manual."
        },
        "create": {
            "url": "/manual_runs",
            "method": "POST",
            "params": {
                "release": {
                    "type": "reference",
                    "required": true,
                    "description": "Release",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "defect": {
                    "type": "reference",
                    "required": false,
                    "description": "Defect",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "defect"
                            }
                        ]
                    }
                },
                "test": {
                    "type": "reference",
                    "required": true,
                    "description": "Test",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "test_manual"
                            },
                            {
                                "type": "gherkin_test"
                            }
                        ]
                    }
                },
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "run_by": {
                    "type": "reference",
                    "required": false,
                    "description": "Run by",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "taxonomies": {
                    "type": "reference",
                    "required": false,
                    "description": "Environment",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "taxonomy_item_node"
                            }
                        ]
                    }
                },
                "draft_run": {
                    "type": "boolean",
                    "required": false,
                    "description": "Draft run"
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                },
                "attachments": {
                    "type": "reference",
                    "required": false,
                    "description": "Attachments",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "attachment"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "native_status": {
                    "type": "reference",
                    "required": true,
                    "description": "Native status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.run_native_status",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "last_modified_by": {
                    "type": "reference",
                    "required": false,
                    "description": "Last modified by",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "parent_suite": {
                    "type": "reference",
                    "required": false,
                    "description": "Suite run",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "run_suite"
                            }
                        ]
                    }
                }
            },
            "description": "Create a single run manual."
        },
        "create-bulk": {
            "url": "/manual_runs",
            "method": "POST",
            "params": {
                "release": {
                    "type": "reference",
                    "required": true,
                    "description": "Release",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "defect": {
                    "type": "reference",
                    "required": false,
                    "description": "Defect",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "defect"
                            }
                        ]
                    }
                },
                "test": {
                    "type": "reference",
                    "required": true,
                    "description": "Test",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "test_manual"
                            },
                            {
                                "type": "gherkin_test"
                            }
                        ]
                    }
                },
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "run_by": {
                    "type": "reference",
                    "required": false,
                    "description": "Run by",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "taxonomies": {
                    "type": "reference",
                    "required": false,
                    "description": "Environment",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "taxonomy_item_node"
                            }
                        ]
                    }
                },
                "draft_run": {
                    "type": "boolean",
                    "required": false,
                    "description": "Draft run"
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                },
                "attachments": {
                    "type": "reference",
                    "required": false,
                    "description": "Attachments",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "attachment"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "native_status": {
                    "type": "reference",
                    "required": true,
                    "description": "Native status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.run_native_status",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "last_modified_by": {
                    "type": "reference",
                    "required": false,
                    "description": "Last modified by",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "parent_suite": {
                    "type": "reference",
                    "required": false,
                    "description": "Suite run",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "run_suite"
                            }
                        ]
                    }
                }
            },
            "description": "Create multiple run manual."
        },
        "update": {
            "url": "/manual_runs/:id",
            "method": "PUT",
            "params": {
                "release": {
                    "type": "reference",
                    "required": false,
                    "description": "Release",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "defect": {
                    "type": "reference",
                    "required": false,
                    "description": "Defect",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "defect"
                            }
                        ]
                    }
                },
                "run_by": {
                    "type": "reference",
                    "required": false,
                    "description": "Run by",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "taxonomies": {
                    "type": "reference",
                    "required": false,
                    "description": "Environment",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "taxonomy_item_node"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "native_status": {
                    "type": "reference",
                    "required": false,
                    "description": "Native status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.run_native_status",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "last_modified_by": {
                    "type": "reference",
                    "required": false,
                    "description": "Last modified by",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "$id": null
            },
            "description": "Update a single run manual."
        },
        "update-bulk": {
            "url": "/manual_runs",
            "method": "PUT",
            "params": {
                "release": {
                    "type": "reference",
                    "required": false,
                    "description": "Release",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "defect": {
                    "type": "reference",
                    "required": false,
                    "description": "Defect",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "defect"
                            }
                        ]
                    }
                },
                "run_by": {
                    "type": "reference",
                    "required": false,
                    "description": "Run by",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "taxonomies": {
                    "type": "reference",
                    "required": false,
                    "description": "Environment",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "taxonomy_item_node"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "native_status": {
                    "type": "reference",
                    "required": false,
                    "description": "Native status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.run_native_status",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "last_modified_by": {
                    "type": "reference",
                    "required": false,
                    "description": "Last modified by",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "$id": null
            },
            "description": "Update multiple run manual."
        },
        "delete": {
            "url": "/manual_runs/:id",
            "method": "DELETE",
            "params": {
                "$id": null
            },
            "description": "Delete a single run manual."
        }
    },
    "list nodes": {
        "get-all": {
            "url": "/list_nodes",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets list nodes list."
        },
        "get": {
            "url": "/list_nodes/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single list node."
        },
        "create": {
            "url": "/list_nodes",
            "method": "POST",
            "params": {
                "list_nodes": {
                    "type": "reference",
                    "required": false,
                    "description": "List items",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                },
                "logical_name": {
                    "type": "string",
                    "required": false,
                    "description": "Logical name",
                    "max_length": 64
                },
                "activity_level": {
                    "type": "integer",
                    "required": false,
                    "description": "Activity level",
                    "min_value": 0,
                    "max_value": 2
                },
                "user_activation_status": {
                    "type": "integer",
                    "required": false,
                    "description": "Activity level",
                    "min_value": 0,
                    "max_value": 2
                },
                "list_root": {
                    "type": "reference",
                    "required": false,
                    "description": "List root",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "list_node"
                            }
                        ]
                    }
                }
            },
            "description": "Create a single list node."
        },
        "create-bulk": {
            "url": "/list_nodes",
            "method": "POST",
            "params": {
                "list_nodes": {
                    "type": "reference",
                    "required": false,
                    "description": "List items",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                },
                "logical_name": {
                    "type": "string",
                    "required": false,
                    "description": "Logical name",
                    "max_length": 64
                },
                "activity_level": {
                    "type": "integer",
                    "required": false,
                    "description": "Activity level",
                    "min_value": 0,
                    "max_value": 2
                },
                "user_activation_status": {
                    "type": "integer",
                    "required": false,
                    "description": "Activity level",
                    "min_value": 0,
                    "max_value": 2
                },
                "list_root": {
                    "type": "reference",
                    "required": false,
                    "description": "List root",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "list_node"
                            }
                        ]
                    }
                }
            },
            "description": "Create multiple list node."
        },
        "update": {
            "url": "/list_nodes/:id",
            "method": "PUT",
            "params": {
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "activity_level": {
                    "type": "integer",
                    "required": false,
                    "description": "Activity level",
                    "min_value": 0,
                    "max_value": 2
                },
                "user_activation_status": {
                    "type": "integer",
                    "required": false,
                    "description": "Activity level",
                    "min_value": 0,
                    "max_value": 2
                },
                "$id": null
            },
            "description": "Update a single list node."
        },
        "update-bulk": {
            "url": "/list_nodes",
            "method": "PUT",
            "params": {
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "activity_level": {
                    "type": "integer",
                    "required": false,
                    "description": "Activity level",
                    "min_value": 0,
                    "max_value": 2
                },
                "user_activation_status": {
                    "type": "integer",
                    "required": false,
                    "description": "Activity level",
                    "min_value": 0,
                    "max_value": 2
                },
                "$id": null
            },
            "description": "Update multiple list node."
        }
    },
    "transitions": {
        "get-all": {
            "url": "/transitions",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets transitions list."
        },
        "get": {
            "url": "/transitions/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single transition."
        },
        "create": {
            "url": "/transitions",
            "method": "POST",
            "params": {
                "is_system": {
                    "type": "boolean",
                    "required": false,
                    "description": "Is system"
                },
                "target_phase": {
                    "type": "reference",
                    "required": false,
                    "description": "Target phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "source_phase": {
                    "type": "reference",
                    "required": false,
                    "description": "Source phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "entity": {
                    "type": "string",
                    "required": false,
                    "description": "Entity",
                    "max_length": 255
                }
            },
            "description": "Create a single transition."
        },
        "create-bulk": {
            "url": "/transitions",
            "method": "POST",
            "params": {
                "is_system": {
                    "type": "boolean",
                    "required": false,
                    "description": "Is system"
                },
                "target_phase": {
                    "type": "reference",
                    "required": false,
                    "description": "Target phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "source_phase": {
                    "type": "reference",
                    "required": false,
                    "description": "Source phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "entity": {
                    "type": "string",
                    "required": false,
                    "description": "Entity",
                    "max_length": 255
                }
            },
            "description": "Create multiple transition."
        },
        "update": {
            "url": "/transitions/:id",
            "method": "PUT",
            "params": {
                "is_system": {
                    "type": "boolean",
                    "required": false,
                    "description": "Is system"
                },
                "target_phase": {
                    "type": "reference",
                    "required": false,
                    "description": "Target phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "source_phase": {
                    "type": "reference",
                    "required": false,
                    "description": "Source phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "entity": {
                    "type": "string",
                    "required": false,
                    "description": "Entity",
                    "max_length": 255
                },
                "$id": null
            },
            "description": "Update a single transition."
        },
        "update-bulk": {
            "url": "/transitions",
            "method": "PUT",
            "params": {
                "is_system": {
                    "type": "boolean",
                    "required": false,
                    "description": "Is system"
                },
                "target_phase": {
                    "type": "reference",
                    "required": false,
                    "description": "Target phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "source_phase": {
                    "type": "reference",
                    "required": false,
                    "description": "Source phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "entity": {
                    "type": "string",
                    "required": false,
                    "description": "Entity",
                    "max_length": 255
                },
                "$id": null
            },
            "description": "Update multiple transition."
        },
        "delete": {
            "url": "/transitions/:id",
            "method": "DELETE",
            "params": {
                "$id": null
            },
            "description": "Delete a single transition."
        }
    },
    "work-items": {
        "get-all": {
            "url": "/work_items",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets work items list."
        },
        "get": {
            "url": "/work_items/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single work item."
        }
    },
    "epics": {
        "get-all": {
            "url": "/epics",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets epics list."
        },
        "get": {
            "url": "/epics/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single epic."
        },
        "create": {
            "url": "/epics",
            "method": "POST",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": true,
                    "description": "Parent",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "work_item_root"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "phase": {
                    "type": "reference",
                    "required": true,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "rroe": {
                    "type": "reference",
                    "required": false,
                    "description": "WSJF time RR | OE",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.wsjf_scale_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                },
                "attachments": {
                    "type": "reference",
                    "required": false,
                    "description": "Attachments",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "attachment"
                            }
                        ]
                    }
                },
                "ordering": {
                    "type": "object",
                    "required": false,
                    "description": "Ordering"
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "epic_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Epic type",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.epic_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "story_points": {
                    "type": "integer",
                    "required": false,
                    "description": "Story points",
                    "min_value": 0,
                    "max_value": 9007199254740991
                },
                "linked_items2": {
                    "type": "reference",
                    "required": false,
                    "description": "Epic(Trace from)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "epic"
                            }
                        ]
                    }
                },
                "linked_items1": {
                    "type": "reference",
                    "required": false,
                    "description": "Epic(Trace to)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "epic"
                            }
                        ]
                    }
                },
                "time_criticality": {
                    "type": "reference",
                    "required": false,
                    "description": "WSJF time criticality",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.wsjf_scale_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "job_size": {
                    "type": "integer",
                    "required": false,
                    "description": "WSJF job size",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "business_value": {
                    "type": "reference",
                    "required": false,
                    "description": "WSJF business value",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.wsjf_scale_type",
                                "type": "list_node"
                            }
                        ]
                    }
                }
            },
            "description": "Create a single epic."
        },
        "create-bulk": {
            "url": "/epics",
            "method": "POST",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": true,
                    "description": "Parent",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "work_item_root"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "phase": {
                    "type": "reference",
                    "required": true,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "rroe": {
                    "type": "reference",
                    "required": false,
                    "description": "WSJF time RR | OE",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.wsjf_scale_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                },
                "attachments": {
                    "type": "reference",
                    "required": false,
                    "description": "Attachments",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "attachment"
                            }
                        ]
                    }
                },
                "ordering": {
                    "type": "object",
                    "required": false,
                    "description": "Ordering"
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "epic_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Epic type",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.epic_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "story_points": {
                    "type": "integer",
                    "required": false,
                    "description": "Story points",
                    "min_value": 0,
                    "max_value": 9007199254740991
                },
                "linked_items2": {
                    "type": "reference",
                    "required": false,
                    "description": "Epic(Trace from)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "epic"
                            }
                        ]
                    }
                },
                "linked_items1": {
                    "type": "reference",
                    "required": false,
                    "description": "Epic(Trace to)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "epic"
                            }
                        ]
                    }
                },
                "time_criticality": {
                    "type": "reference",
                    "required": false,
                    "description": "WSJF time criticality",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.wsjf_scale_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "job_size": {
                    "type": "integer",
                    "required": false,
                    "description": "WSJF job size",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "business_value": {
                    "type": "reference",
                    "required": false,
                    "description": "WSJF business value",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.wsjf_scale_type",
                                "type": "list_node"
                            }
                        ]
                    }
                }
            },
            "description": "Create multiple epic."
        },
        "update": {
            "url": "/epics/:id",
            "method": "PUT",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": false,
                    "description": "Parent",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "work_item_root"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "phase": {
                    "type": "reference",
                    "required": false,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "rroe": {
                    "type": "reference",
                    "required": false,
                    "description": "WSJF time RR | OE",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.wsjf_scale_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "ordering": {
                    "type": "object",
                    "required": false,
                    "description": "Ordering"
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "epic_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Epic type",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.epic_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "story_points": {
                    "type": "integer",
                    "required": false,
                    "description": "Story points",
                    "min_value": 0,
                    "max_value": 9007199254740991
                },
                "linked_items2": {
                    "type": "reference",
                    "required": false,
                    "description": "Epic(Trace from)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "epic"
                            }
                        ]
                    }
                },
                "linked_items1": {
                    "type": "reference",
                    "required": false,
                    "description": "Epic(Trace to)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "epic"
                            }
                        ]
                    }
                },
                "time_criticality": {
                    "type": "reference",
                    "required": false,
                    "description": "WSJF time criticality",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.wsjf_scale_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "job_size": {
                    "type": "integer",
                    "required": false,
                    "description": "WSJF job size",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "business_value": {
                    "type": "reference",
                    "required": false,
                    "description": "WSJF business value",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.wsjf_scale_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "$id": null
            },
            "description": "Update a single epic."
        },
        "update-bulk": {
            "url": "/epics",
            "method": "PUT",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": false,
                    "description": "Parent",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "work_item_root"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "phase": {
                    "type": "reference",
                    "required": false,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "rroe": {
                    "type": "reference",
                    "required": false,
                    "description": "WSJF time RR | OE",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.wsjf_scale_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "ordering": {
                    "type": "object",
                    "required": false,
                    "description": "Ordering"
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "epic_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Epic type",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.epic_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "story_points": {
                    "type": "integer",
                    "required": false,
                    "description": "Story points",
                    "min_value": 0,
                    "max_value": 9007199254740991
                },
                "linked_items2": {
                    "type": "reference",
                    "required": false,
                    "description": "Epic(Trace from)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "epic"
                            }
                        ]
                    }
                },
                "linked_items1": {
                    "type": "reference",
                    "required": false,
                    "description": "Epic(Trace to)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "epic"
                            }
                        ]
                    }
                },
                "time_criticality": {
                    "type": "reference",
                    "required": false,
                    "description": "WSJF time criticality",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.wsjf_scale_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "job_size": {
                    "type": "integer",
                    "required": false,
                    "description": "WSJF job size",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "business_value": {
                    "type": "reference",
                    "required": false,
                    "description": "WSJF business value",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.wsjf_scale_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "$id": null
            },
            "description": "Update multiple epic."
        },
        "delete": {
            "url": "/epics/:id",
            "method": "DELETE",
            "params": {
                "$id": null
            },
            "description": "Delete a single epic."
        }
    },
    "run suites": {
        "get-all": {
            "url": "/suite_run",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets run suites list."
        },
        "get": {
            "url": "/suite_run/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single run suite."
        },
        "create": {
            "url": "/suite_run",
            "method": "POST",
            "params": {
                "release": {
                    "type": "reference",
                    "required": true,
                    "description": "Release",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "defect": {
                    "type": "reference",
                    "required": false,
                    "description": "Defect",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "defect"
                            }
                        ]
                    }
                },
                "test": {
                    "type": "reference",
                    "required": true,
                    "description": "Test",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "test_suite"
                            }
                        ]
                    }
                },
                "native_status": {
                    "type": "reference",
                    "required": true,
                    "description": "Native status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.run_native_status",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "last_modified_by": {
                    "type": "reference",
                    "required": false,
                    "description": "Last modified by",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "draft_run": {
                    "type": "boolean",
                    "required": false,
                    "description": "Draft run"
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                }
            },
            "description": "Create a single run suite."
        },
        "create-bulk": {
            "url": "/suite_run",
            "method": "POST",
            "params": {
                "release": {
                    "type": "reference",
                    "required": true,
                    "description": "Release",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "defect": {
                    "type": "reference",
                    "required": false,
                    "description": "Defect",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "defect"
                            }
                        ]
                    }
                },
                "test": {
                    "type": "reference",
                    "required": true,
                    "description": "Test",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "test_suite"
                            }
                        ]
                    }
                },
                "native_status": {
                    "type": "reference",
                    "required": true,
                    "description": "Native status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.run_native_status",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "last_modified_by": {
                    "type": "reference",
                    "required": false,
                    "description": "Last modified by",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "draft_run": {
                    "type": "boolean",
                    "required": false,
                    "description": "Draft run"
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                }
            },
            "description": "Create multiple run suite."
        },
        "update": {
            "url": "/suite_run/:id",
            "method": "PUT",
            "params": {
                "release": {
                    "type": "reference",
                    "required": false,
                    "description": "Release",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "defect": {
                    "type": "reference",
                    "required": false,
                    "description": "Defect",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "defect"
                            }
                        ]
                    }
                },
                "native_status": {
                    "type": "reference",
                    "required": false,
                    "description": "Native status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.run_native_status",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "last_modified_by": {
                    "type": "reference",
                    "required": false,
                    "description": "Last modified by",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "$id": null
            },
            "description": "Update a single run suite."
        },
        "update-bulk": {
            "url": "/suite_run",
            "method": "PUT",
            "params": {
                "release": {
                    "type": "reference",
                    "required": false,
                    "description": "Release",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "defect": {
                    "type": "reference",
                    "required": false,
                    "description": "Defect",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "defect"
                            }
                        ]
                    }
                },
                "native_status": {
                    "type": "reference",
                    "required": false,
                    "description": "Native status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.run_native_status",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "last_modified_by": {
                    "type": "reference",
                    "required": false,
                    "description": "Last modified by",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "$id": null
            },
            "description": "Update multiple run suite."
        },
        "delete": {
            "url": "/suite_run/:id",
            "method": "DELETE",
            "params": {
                "$id": null
            },
            "description": "Delete a single run suite."
        }
    },
    "metaphases": {
        "get-all": {
            "url": "/metaphases",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets metaphases list."
        },
        "get": {
            "url": "/metaphases/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single metaphase."
        }
    },
    "requirement documents": {
        "get-all": {
            "url": "/requirement_documents",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets requirement documents list."
        },
        "get": {
            "url": "/requirement_documents/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single requirement document."
        },
        "create": {
            "url": "/requirement_documents",
            "method": "POST",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": true,
                    "description": "Parent",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "requirement_document"
                            },
                            {
                                "type": "requirement_folder"
                            }
                        ]
                    }
                },
                "attachments": {
                    "type": "reference",
                    "required": false,
                    "description": "Attachments",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "attachment"
                            }
                        ]
                    }
                },
                "ordering": {
                    "type": "object",
                    "required": false,
                    "description": "Ordering"
                },
                "release": {
                    "type": "reference",
                    "required": false,
                    "description": "Release",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "priority_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Priority",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.priority",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "phase": {
                    "type": "reference",
                    "required": true,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "related_from_requirements": {
                    "type": "reference",
                    "required": false,
                    "description": "Related from requirements",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "requirement_document"
                            }
                        ]
                    }
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                }
            },
            "description": "Create a single requirement document."
        },
        "create-bulk": {
            "url": "/requirement_documents",
            "method": "POST",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": true,
                    "description": "Parent",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "requirement_document"
                            },
                            {
                                "type": "requirement_folder"
                            }
                        ]
                    }
                },
                "attachments": {
                    "type": "reference",
                    "required": false,
                    "description": "Attachments",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "attachment"
                            }
                        ]
                    }
                },
                "ordering": {
                    "type": "object",
                    "required": false,
                    "description": "Ordering"
                },
                "release": {
                    "type": "reference",
                    "required": false,
                    "description": "Release",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "priority_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Priority",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.priority",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "phase": {
                    "type": "reference",
                    "required": true,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "related_from_requirements": {
                    "type": "reference",
                    "required": false,
                    "description": "Related from requirements",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "requirement_document"
                            }
                        ]
                    }
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                }
            },
            "description": "Create multiple requirement document."
        },
        "update": {
            "url": "/requirement_documents/:id",
            "method": "PUT",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": false,
                    "description": "Parent",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "requirement_document"
                            },
                            {
                                "type": "requirement_folder"
                            }
                        ]
                    }
                },
                "ordering": {
                    "type": "object",
                    "required": false,
                    "description": "Ordering"
                },
                "release": {
                    "type": "reference",
                    "required": false,
                    "description": "Release",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "priority_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Priority",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.priority",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "phase": {
                    "type": "reference",
                    "required": false,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "related_from_requirements": {
                    "type": "reference",
                    "required": false,
                    "description": "Related from requirements",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "requirement_document"
                            }
                        ]
                    }
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "$id": null
            },
            "description": "Update a single requirement document."
        },
        "update-bulk": {
            "url": "/requirement_documents",
            "method": "PUT",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": false,
                    "description": "Parent",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "requirement_document"
                            },
                            {
                                "type": "requirement_folder"
                            }
                        ]
                    }
                },
                "ordering": {
                    "type": "object",
                    "required": false,
                    "description": "Ordering"
                },
                "release": {
                    "type": "reference",
                    "required": false,
                    "description": "Release",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "priority_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Priority",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.priority",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "phase": {
                    "type": "reference",
                    "required": false,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "related_from_requirements": {
                    "type": "reference",
                    "required": false,
                    "description": "Related from requirements",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "requirement_document"
                            }
                        ]
                    }
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "$id": null
            },
            "description": "Update multiple requirement document."
        },
        "delete": {
            "url": "/requirement_documents/:id",
            "method": "DELETE",
            "params": {
                "$id": null
            },
            "description": "Delete a single requirement document."
        }
    },
    "tests": {
        "get-all": {
            "url": "/tests",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets tests list."
        },
        "get": {
            "url": "/tests/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single test."
        },
        "update": {
            "url": "/tests/:id",
            "method": "PUT",
            "params": {
                "covered_content": {
                    "type": "reference",
                    "required": false,
                    "description": "Backlog Coverage",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "backlog_coverage": {
                    "type": "reference",
                    "required": false,
                    "description": "Backlog Coverage",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "run_set_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Run set",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "28rxlvzmx9ppi9oy1kk4j96p3",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "phase": {
                    "type": "reference",
                    "required": false,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "product_areas": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "application_modules": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "estimated_duration": {
                    "type": "integer",
                    "required": false,
                    "description": "Estimated duration (minutes)",
                    "min_value": 1,
                    "max_value": 7000
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "automation_status": {
                    "type": "reference",
                    "required": false,
                    "description": "Automation status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.automation_status",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "team_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Team",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "team"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "designer": {
                    "type": "reference",
                    "required": false,
                    "description": "Designer",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "covered_requirement": {
                    "type": "reference",
                    "required": false,
                    "description": "Covered requirement",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "requirement_document"
                            }
                        ]
                    }
                },
                "test_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Test type",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "list_node.test_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "modified_by": {
                    "type": "reference",
                    "required": false,
                    "description": "Modified by",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "$id": null
            },
            "description": "Update a single test."
        },
        "update-bulk": {
            "url": "/tests",
            "method": "PUT",
            "params": {
                "covered_content": {
                    "type": "reference",
                    "required": false,
                    "description": "Backlog Coverage",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "backlog_coverage": {
                    "type": "reference",
                    "required": false,
                    "description": "Backlog Coverage",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "run_set_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Run set",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "28rxlvzmx9ppi9oy1kk4j96p3",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "phase": {
                    "type": "reference",
                    "required": false,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "product_areas": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "application_modules": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "estimated_duration": {
                    "type": "integer",
                    "required": false,
                    "description": "Estimated duration (minutes)",
                    "min_value": 1,
                    "max_value": 7000
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "automation_status": {
                    "type": "reference",
                    "required": false,
                    "description": "Automation status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.automation_status",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "team_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Team",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "team"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "designer": {
                    "type": "reference",
                    "required": false,
                    "description": "Designer",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "covered_requirement": {
                    "type": "reference",
                    "required": false,
                    "description": "Covered requirement",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "requirement_document"
                            }
                        ]
                    }
                },
                "test_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Test type",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "list_node.test_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "modified_by": {
                    "type": "reference",
                    "required": false,
                    "description": "Modified by",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "$id": null
            },
            "description": "Update multiple test."
        }
    },
    "pipelines": {
        "get-all": {
            "url": "/pipelines",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets pipelines list."
        },
        "get": {
            "url": "/pipelines/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single pipeline."
        },
        "create": {
            "url": "/pipelines",
            "method": "POST",
            "params": {
                "current_release": {
                    "type": "reference",
                    "required": false,
                    "description": "Current release",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "last_finish_pipelinerun": {
                    "type": "object",
                    "required": false,
                    "description": "Last finish pipelinerun"
                },
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "jobs": {
                    "type": "object",
                    "required": false,
                    "description": "Jobs"
                },
                "referral_pipeline": {
                    "type": "reference",
                    "required": false,
                    "description": "Referral pipeline",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "pipeline"
                            }
                        ]
                    }
                },
                "root_job_ci_id": {
                    "type": "string",
                    "required": false,
                    "description": "Root job ID",
                    "max_length": 4000
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                },
                "ci_server": {
                    "type": "reference",
                    "required": false,
                    "description": "CI server",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "ci_server"
                            }
                        ]
                    }
                },
                "server_ci_id": {
                    "type": "string",
                    "required": false,
                    "description": "CI server ID",
                    "max_length": 4000
                }
            },
            "description": "Create a single pipeline."
        },
        "create-bulk": {
            "url": "/pipelines",
            "method": "POST",
            "params": {
                "current_release": {
                    "type": "reference",
                    "required": false,
                    "description": "Current release",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "last_finish_pipelinerun": {
                    "type": "object",
                    "required": false,
                    "description": "Last finish pipelinerun"
                },
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "jobs": {
                    "type": "object",
                    "required": false,
                    "description": "Jobs"
                },
                "referral_pipeline": {
                    "type": "reference",
                    "required": false,
                    "description": "Referral pipeline",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "pipeline"
                            }
                        ]
                    }
                },
                "root_job_ci_id": {
                    "type": "string",
                    "required": false,
                    "description": "Root job ID",
                    "max_length": 4000
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                },
                "ci_server": {
                    "type": "reference",
                    "required": false,
                    "description": "CI server",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "ci_server"
                            }
                        ]
                    }
                },
                "server_ci_id": {
                    "type": "string",
                    "required": false,
                    "description": "CI server ID",
                    "max_length": 4000
                }
            },
            "description": "Create multiple pipeline."
        },
        "update": {
            "url": "/pipelines/:id",
            "method": "PUT",
            "params": {
                "current_release": {
                    "type": "reference",
                    "required": false,
                    "description": "Current release",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "last_finish_pipelinerun": {
                    "type": "object",
                    "required": false,
                    "description": "Last finish pipelinerun"
                },
                "jobs": {
                    "type": "object",
                    "required": false,
                    "description": "Jobs"
                },
                "referral_pipeline": {
                    "type": "reference",
                    "required": false,
                    "description": "Referral pipeline",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "pipeline"
                            }
                        ]
                    }
                },
                "root_job_ci_id": {
                    "type": "string",
                    "required": false,
                    "description": "Root job ID",
                    "max_length": 4000
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "server_ci_id": {
                    "type": "string",
                    "required": false,
                    "description": "CI server ID",
                    "max_length": 4000
                },
                "$id": null
            },
            "description": "Update a single pipeline."
        },
        "update-bulk": {
            "url": "/pipelines",
            "method": "PUT",
            "params": {
                "current_release": {
                    "type": "reference",
                    "required": false,
                    "description": "Current release",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "last_finish_pipelinerun": {
                    "type": "object",
                    "required": false,
                    "description": "Last finish pipelinerun"
                },
                "jobs": {
                    "type": "object",
                    "required": false,
                    "description": "Jobs"
                },
                "referral_pipeline": {
                    "type": "reference",
                    "required": false,
                    "description": "Referral pipeline",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "pipeline"
                            }
                        ]
                    }
                },
                "root_job_ci_id": {
                    "type": "string",
                    "required": false,
                    "description": "Root job ID",
                    "max_length": 4000
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "server_ci_id": {
                    "type": "string",
                    "required": false,
                    "description": "CI server ID",
                    "max_length": 4000
                },
                "$id": null
            },
            "description": "Update multiple pipeline."
        },
        "delete": {
            "url": "/pipelines/:id",
            "method": "DELETE",
            "params": {
                "$id": null
            },
            "description": "Delete a single pipeline."
        }
    },
    "pipeline runs": {
        "get-all": {
            "url": "/pipeline_runs",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets pipeline runs list."
        },
        "get": {
            "url": "/pipeline_runs/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single pipeline run."
        },
        "update": {
            "url": "/pipeline_runs/:id",
            "method": "PUT",
            "params": {
                "client_lock_stamp": {
                    "type": "integer",
                    "required": false,
                    "description": "Client lock stamp",
                    "min_value": 0,
                    "max_value": 9007199254740991
                },
                "not_me_user": {
                    "type": "reference",
                    "required": false,
                    "description": "Not me user",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "participating_ci_builds": {
                    "type": "object",
                    "required": false,
                    "description": "Participating ci builds"
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "application_package": {
                    "type": "reference",
                    "required": false,
                    "description": "Application package",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "application_package"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "runs": {
                    "type": "reference",
                    "required": false,
                    "description": "Runs",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "run_automated"
                            },
                            {
                                "type": "gherkin_automated_run"
                            }
                        ]
                    }
                },
                "$id": null
            },
            "description": "Update a single pipeline run."
        },
        "update-bulk": {
            "url": "/pipeline_runs",
            "method": "PUT",
            "params": {
                "client_lock_stamp": {
                    "type": "integer",
                    "required": false,
                    "description": "Client lock stamp",
                    "min_value": 0,
                    "max_value": 9007199254740991
                },
                "not_me_user": {
                    "type": "reference",
                    "required": false,
                    "description": "Not me user",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "participating_ci_builds": {
                    "type": "object",
                    "required": false,
                    "description": "Participating ci builds"
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "application_package": {
                    "type": "reference",
                    "required": false,
                    "description": "Application package",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "application_package"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "runs": {
                    "type": "reference",
                    "required": false,
                    "description": "Runs",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "run_automated"
                            },
                            {
                                "type": "gherkin_automated_run"
                            }
                        ]
                    }
                },
                "$id": null
            },
            "description": "Update multiple pipeline run."
        }
    },
    "stories": {
        "get-all": {
            "url": "/stories",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets stories list."
        },
        "get": {
            "url": "/stories/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single story."
        },
        "create": {
            "url": "/stories",
            "method": "POST",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": true,
                    "description": "Feature",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "work_item_root"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "release": {
                    "type": "reference",
                    "required": false,
                    "description": "Release",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "customers_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "7v128zzgmygq5urx3r9wg8lme",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "sprint": {
                    "type": "reference",
                    "required": false,
                    "description": "Sprint",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "sprint"
                            }
                        ]
                    }
                },
                "source_ids_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Source IDs",
                    "max_length": 255
                },
                "customer_type_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer Type(legacy)",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "673yvl3rkkpkphknnogjlvowx",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "story_type_c_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Story Type",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.feature_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "phase": {
                    "type": "reference",
                    "required": true,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "test": {
                    "type": "reference",
                    "required": false,
                    "description": "Test",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "test_manual"
                            },
                            {
                                "type": "gherkin_test"
                            },
                            {
                                "type": "test_automated"
                            },
                            {
                                "type": "test_suite"
                            }
                        ]
                    }
                },
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "dev_story_points": {
                    "type": "integer",
                    "required": false,
                    "description": "Dev Story Points Days(legacy)",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "product_areas": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "application_modules": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "priority": {
                    "type": "reference",
                    "required": false,
                    "description": "Priority",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.priority",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "qa_story_points": {
                    "type": "string",
                    "required": false,
                    "description": "QA Story Points Days(legacy)",
                    "max_length": 255
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                },
                "cross_themes": {
                    "type": "string",
                    "required": false,
                    "description": "Cross Themes(legacy)",
                    "max_length": 255
                },
                "enhancment_request_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Enhancement Request",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "zwymje62z6e27u478ow5grlqk",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "performance_owner_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Performance Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "dev_story_points_udf": {
                    "type": "integer",
                    "required": false,
                    "description": "Dev Story Points Days",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "attachments": {
                    "type": "reference",
                    "required": false,
                    "description": "Attachments",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "attachment"
                            }
                        ]
                    }
                },
                "internal_customer_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Internal Customer(legacy)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "2mk79k1d1ygrzsqk4g71ndxp0",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "ordering": {
                    "type": "object",
                    "required": false,
                    "description": "Ordering"
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "testable_udf": {
                    "type": "boolean",
                    "required": false,
                    "description": "Testable"
                },
                "blocked": {
                    "type": "boolean",
                    "required": false,
                    "description": "Blocked"
                },
                "group_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Group",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "n56edn77jw20ear1woz7xklyw",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "ticket_number_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Ticket Number(legacy)",
                    "max_length": 255
                },
                "qa_owner_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "US QA Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "depends_on_ids_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Depends on IDs",
                    "max_length": 255
                },
                "story_points": {
                    "type": "integer",
                    "required": false,
                    "description": "Story points",
                    "min_value": 0,
                    "max_value": 9007199254740991
                },
                "linked_items2": {
                    "type": "reference",
                    "required": false,
                    "description": "Linked Defect",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            },
                            {
                                "type": "defect"
                            }
                        ]
                    }
                },
                "linked_items1": {
                    "type": "reference",
                    "required": false,
                    "description": "Story(Trace from)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            }
                        ]
                    }
                },
                "team": {
                    "type": "reference",
                    "required": false,
                    "description": "Team",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "team"
                            }
                        ]
                    }
                },
                "customer_contact_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer contact(legacy)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "qa_story_points_udf": {
                    "type": "integer",
                    "required": false,
                    "description": "QA Story Points Days",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "performance_status_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Performance Status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "g97o48vko51qqcwv0d5yz2nm3",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "blocked_reason": {
                    "type": "string",
                    "required": false,
                    "description": "Blocked reason",
                    "max_length": 255
                },
                "customer_email_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Customer Email",
                    "max_length": 255
                },
                "us_priority_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "US Priority",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.priority",
                                "type": "list_node"
                            }
                        ]
                    }
                }
            },
            "description": "Create a single story."
        },
        "create-bulk": {
            "url": "/stories",
            "method": "POST",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": true,
                    "description": "Feature",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "work_item_root"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "release": {
                    "type": "reference",
                    "required": false,
                    "description": "Release",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "customers_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "7v128zzgmygq5urx3r9wg8lme",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "sprint": {
                    "type": "reference",
                    "required": false,
                    "description": "Sprint",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "sprint"
                            }
                        ]
                    }
                },
                "source_ids_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Source IDs",
                    "max_length": 255
                },
                "customer_type_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer Type(legacy)",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "673yvl3rkkpkphknnogjlvowx",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "story_type_c_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Story Type",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.feature_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "phase": {
                    "type": "reference",
                    "required": true,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "test": {
                    "type": "reference",
                    "required": false,
                    "description": "Test",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "test_manual"
                            },
                            {
                                "type": "gherkin_test"
                            },
                            {
                                "type": "test_automated"
                            },
                            {
                                "type": "test_suite"
                            }
                        ]
                    }
                },
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "dev_story_points": {
                    "type": "integer",
                    "required": false,
                    "description": "Dev Story Points Days(legacy)",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "product_areas": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "application_modules": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "priority": {
                    "type": "reference",
                    "required": false,
                    "description": "Priority",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.priority",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "qa_story_points": {
                    "type": "string",
                    "required": false,
                    "description": "QA Story Points Days(legacy)",
                    "max_length": 255
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                },
                "cross_themes": {
                    "type": "string",
                    "required": false,
                    "description": "Cross Themes(legacy)",
                    "max_length": 255
                },
                "enhancment_request_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Enhancement Request",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "zwymje62z6e27u478ow5grlqk",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "performance_owner_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Performance Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "dev_story_points_udf": {
                    "type": "integer",
                    "required": false,
                    "description": "Dev Story Points Days",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "attachments": {
                    "type": "reference",
                    "required": false,
                    "description": "Attachments",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "attachment"
                            }
                        ]
                    }
                },
                "internal_customer_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Internal Customer(legacy)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "2mk79k1d1ygrzsqk4g71ndxp0",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "ordering": {
                    "type": "object",
                    "required": false,
                    "description": "Ordering"
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "testable_udf": {
                    "type": "boolean",
                    "required": false,
                    "description": "Testable"
                },
                "blocked": {
                    "type": "boolean",
                    "required": false,
                    "description": "Blocked"
                },
                "group_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Group",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "n56edn77jw20ear1woz7xklyw",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "ticket_number_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Ticket Number(legacy)",
                    "max_length": 255
                },
                "qa_owner_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "US QA Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "depends_on_ids_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Depends on IDs",
                    "max_length": 255
                },
                "story_points": {
                    "type": "integer",
                    "required": false,
                    "description": "Story points",
                    "min_value": 0,
                    "max_value": 9007199254740991
                },
                "linked_items2": {
                    "type": "reference",
                    "required": false,
                    "description": "Linked Defect",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            },
                            {
                                "type": "defect"
                            }
                        ]
                    }
                },
                "linked_items1": {
                    "type": "reference",
                    "required": false,
                    "description": "Story(Trace from)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            }
                        ]
                    }
                },
                "team": {
                    "type": "reference",
                    "required": false,
                    "description": "Team",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "team"
                            }
                        ]
                    }
                },
                "customer_contact_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer contact(legacy)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "qa_story_points_udf": {
                    "type": "integer",
                    "required": false,
                    "description": "QA Story Points Days",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "performance_status_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Performance Status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "g97o48vko51qqcwv0d5yz2nm3",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "blocked_reason": {
                    "type": "string",
                    "required": false,
                    "description": "Blocked reason",
                    "max_length": 255
                },
                "customer_email_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Customer Email",
                    "max_length": 255
                },
                "us_priority_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "US Priority",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.priority",
                                "type": "list_node"
                            }
                        ]
                    }
                }
            },
            "description": "Create multiple story."
        },
        "update": {
            "url": "/stories/:id",
            "method": "PUT",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": false,
                    "description": "Feature",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "work_item_root"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "release": {
                    "type": "reference",
                    "required": false,
                    "description": "Release",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "customers_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "7v128zzgmygq5urx3r9wg8lme",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "sprint": {
                    "type": "reference",
                    "required": false,
                    "description": "Sprint",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "sprint"
                            }
                        ]
                    }
                },
                "source_ids_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Source IDs",
                    "max_length": 255
                },
                "customer_type_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer Type(legacy)",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "673yvl3rkkpkphknnogjlvowx",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "story_type_c_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Story Type",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.feature_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "phase": {
                    "type": "reference",
                    "required": false,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "test": {
                    "type": "reference",
                    "required": false,
                    "description": "Test",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "test_manual"
                            },
                            {
                                "type": "gherkin_test"
                            },
                            {
                                "type": "test_automated"
                            },
                            {
                                "type": "test_suite"
                            }
                        ]
                    }
                },
                "dev_story_points": {
                    "type": "integer",
                    "required": false,
                    "description": "Dev Story Points Days(legacy)",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "product_areas": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "application_modules": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "priority": {
                    "type": "reference",
                    "required": false,
                    "description": "Priority",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.priority",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "qa_story_points": {
                    "type": "string",
                    "required": false,
                    "description": "QA Story Points Days(legacy)",
                    "max_length": 255
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "cross_themes": {
                    "type": "string",
                    "required": false,
                    "description": "Cross Themes(legacy)",
                    "max_length": 255
                },
                "enhancment_request_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Enhancement Request",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "zwymje62z6e27u478ow5grlqk",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "performance_owner_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Performance Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "dev_story_points_udf": {
                    "type": "integer",
                    "required": false,
                    "description": "Dev Story Points Days",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "internal_customer_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Internal Customer(legacy)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "2mk79k1d1ygrzsqk4g71ndxp0",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "ordering": {
                    "type": "object",
                    "required": false,
                    "description": "Ordering"
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "testable_udf": {
                    "type": "boolean",
                    "required": false,
                    "description": "Testable"
                },
                "blocked": {
                    "type": "boolean",
                    "required": false,
                    "description": "Blocked"
                },
                "group_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Group",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "n56edn77jw20ear1woz7xklyw",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "ticket_number_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Ticket Number(legacy)",
                    "max_length": 255
                },
                "qa_owner_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "US QA Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "depends_on_ids_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Depends on IDs",
                    "max_length": 255
                },
                "story_points": {
                    "type": "integer",
                    "required": false,
                    "description": "Story points",
                    "min_value": 0,
                    "max_value": 9007199254740991
                },
                "linked_items2": {
                    "type": "reference",
                    "required": false,
                    "description": "Linked Defect",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            },
                            {
                                "type": "defect"
                            }
                        ]
                    }
                },
                "linked_items1": {
                    "type": "reference",
                    "required": false,
                    "description": "Story(Trace from)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            }
                        ]
                    }
                },
                "team": {
                    "type": "reference",
                    "required": false,
                    "description": "Team",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "team"
                            }
                        ]
                    }
                },
                "customer_contact_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer contact(legacy)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "qa_story_points_udf": {
                    "type": "integer",
                    "required": false,
                    "description": "QA Story Points Days",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "performance_status_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Performance Status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "g97o48vko51qqcwv0d5yz2nm3",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "blocked_reason": {
                    "type": "string",
                    "required": false,
                    "description": "Blocked reason",
                    "max_length": 255
                },
                "customer_email_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Customer Email",
                    "max_length": 255
                },
                "us_priority_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "US Priority",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.priority",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "$id": null
            },
            "description": "Update a single story."
        },
        "update-bulk": {
            "url": "/stories",
            "method": "PUT",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": false,
                    "description": "Feature",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "work_item_root"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "release": {
                    "type": "reference",
                    "required": false,
                    "description": "Release",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "customers_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "7v128zzgmygq5urx3r9wg8lme",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "sprint": {
                    "type": "reference",
                    "required": false,
                    "description": "Sprint",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "sprint"
                            }
                        ]
                    }
                },
                "source_ids_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Source IDs",
                    "max_length": 255
                },
                "customer_type_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer Type(legacy)",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "673yvl3rkkpkphknnogjlvowx",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "story_type_c_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Story Type",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.feature_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "phase": {
                    "type": "reference",
                    "required": false,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "test": {
                    "type": "reference",
                    "required": false,
                    "description": "Test",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "test_manual"
                            },
                            {
                                "type": "gherkin_test"
                            },
                            {
                                "type": "test_automated"
                            },
                            {
                                "type": "test_suite"
                            }
                        ]
                    }
                },
                "dev_story_points": {
                    "type": "integer",
                    "required": false,
                    "description": "Dev Story Points Days(legacy)",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "product_areas": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "application_modules": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "priority": {
                    "type": "reference",
                    "required": false,
                    "description": "Priority",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.priority",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "qa_story_points": {
                    "type": "string",
                    "required": false,
                    "description": "QA Story Points Days(legacy)",
                    "max_length": 255
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "cross_themes": {
                    "type": "string",
                    "required": false,
                    "description": "Cross Themes(legacy)",
                    "max_length": 255
                },
                "enhancment_request_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Enhancement Request",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "zwymje62z6e27u478ow5grlqk",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "performance_owner_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Performance Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "dev_story_points_udf": {
                    "type": "integer",
                    "required": false,
                    "description": "Dev Story Points Days",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "internal_customer_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Internal Customer(legacy)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "2mk79k1d1ygrzsqk4g71ndxp0",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "ordering": {
                    "type": "object",
                    "required": false,
                    "description": "Ordering"
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "testable_udf": {
                    "type": "boolean",
                    "required": false,
                    "description": "Testable"
                },
                "blocked": {
                    "type": "boolean",
                    "required": false,
                    "description": "Blocked"
                },
                "group_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Group",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "n56edn77jw20ear1woz7xklyw",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "ticket_number_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Ticket Number(legacy)",
                    "max_length": 255
                },
                "qa_owner_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "US QA Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "depends_on_ids_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Depends on IDs",
                    "max_length": 255
                },
                "story_points": {
                    "type": "integer",
                    "required": false,
                    "description": "Story points",
                    "min_value": 0,
                    "max_value": 9007199254740991
                },
                "linked_items2": {
                    "type": "reference",
                    "required": false,
                    "description": "Linked Defect",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            },
                            {
                                "type": "defect"
                            }
                        ]
                    }
                },
                "linked_items1": {
                    "type": "reference",
                    "required": false,
                    "description": "Story(Trace from)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            }
                        ]
                    }
                },
                "team": {
                    "type": "reference",
                    "required": false,
                    "description": "Team",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "team"
                            }
                        ]
                    }
                },
                "customer_contact_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer contact(legacy)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "qa_story_points_udf": {
                    "type": "integer",
                    "required": false,
                    "description": "QA Story Points Days",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "performance_status_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Performance Status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "g97o48vko51qqcwv0d5yz2nm3",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "blocked_reason": {
                    "type": "string",
                    "required": false,
                    "description": "Blocked reason",
                    "max_length": 255
                },
                "customer_email_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Customer Email",
                    "max_length": 255
                },
                "us_priority_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "US Priority",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.priority",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "$id": null
            },
            "description": "Update multiple story."
        },
        "delete": {
            "url": "/stories/:id",
            "method": "DELETE",
            "params": {
                "$id": null
            },
            "description": "Delete a single story."
        }
    },
    "releases": {
        "get-all": {
            "url": "/releases",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets releases list."
        },
        "get": {
            "url": "/releases/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single release."
        },
        "create": {
            "url": "/releases",
            "method": "POST",
            "params": {
                "end_date": {
                    "type": "date",
                    "required": true,
                    "description": "End date"
                },
                "attachments": {
                    "type": "reference",
                    "required": false,
                    "description": "Attachments",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "attachment"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "activity_level": {
                    "type": "integer",
                    "required": false,
                    "description": "Active status",
                    "min_value": 0,
                    "max_value": 2
                },
                "user_activation_status": {
                    "type": "integer",
                    "required": false,
                    "description": "Active status",
                    "min_value": 0,
                    "max_value": 2
                },
                "sprint_duration": {
                    "type": "integer",
                    "required": false,
                    "description": "Sprint duration",
                    "min_value": 1,
                    "max_value": 7000
                },
                "start_date": {
                    "type": "date",
                    "required": true,
                    "description": "Start date"
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                },
                "agile_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Type",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.release_agile_type",
                                "type": "list_node"
                            }
                        ]
                    }
                }
            },
            "description": "Create a single release."
        },
        "create-bulk": {
            "url": "/releases",
            "method": "POST",
            "params": {
                "end_date": {
                    "type": "date",
                    "required": true,
                    "description": "End date"
                },
                "attachments": {
                    "type": "reference",
                    "required": false,
                    "description": "Attachments",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "attachment"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "activity_level": {
                    "type": "integer",
                    "required": false,
                    "description": "Active status",
                    "min_value": 0,
                    "max_value": 2
                },
                "user_activation_status": {
                    "type": "integer",
                    "required": false,
                    "description": "Active status",
                    "min_value": 0,
                    "max_value": 2
                },
                "sprint_duration": {
                    "type": "integer",
                    "required": false,
                    "description": "Sprint duration",
                    "min_value": 1,
                    "max_value": 7000
                },
                "start_date": {
                    "type": "date",
                    "required": true,
                    "description": "Start date"
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                },
                "agile_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Type",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.release_agile_type",
                                "type": "list_node"
                            }
                        ]
                    }
                }
            },
            "description": "Create multiple release."
        },
        "update": {
            "url": "/releases/:id",
            "method": "PUT",
            "params": {
                "end_date": {
                    "type": "date",
                    "required": false,
                    "description": "End date"
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "activity_level": {
                    "type": "integer",
                    "required": false,
                    "description": "Active status",
                    "min_value": 0,
                    "max_value": 2
                },
                "user_activation_status": {
                    "type": "integer",
                    "required": false,
                    "description": "Active status",
                    "min_value": 0,
                    "max_value": 2
                },
                "start_date": {
                    "type": "date",
                    "required": false,
                    "description": "Start date"
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "$id": null
            },
            "description": "Update a single release."
        },
        "update-bulk": {
            "url": "/releases",
            "method": "PUT",
            "params": {
                "end_date": {
                    "type": "date",
                    "required": false,
                    "description": "End date"
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "activity_level": {
                    "type": "integer",
                    "required": false,
                    "description": "Active status",
                    "min_value": 0,
                    "max_value": 2
                },
                "user_activation_status": {
                    "type": "integer",
                    "required": false,
                    "description": "Active status",
                    "min_value": 0,
                    "max_value": 2
                },
                "start_date": {
                    "type": "date",
                    "required": false,
                    "description": "Start date"
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "$id": null
            },
            "description": "Update multiple release."
        },
        "delete": {
            "url": "/releases/:id",
            "method": "DELETE",
            "params": {
                "$id": null
            },
            "description": "Delete a single release."
        }
    },
    "workspace users": {
        "get-all": {
            "url": "/workspace_users",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets workspace users list."
        },
        "get": {
            "url": "/workspace_users/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single workspace user."
        },
        "create": {
            "url": "/workspace_users",
            "method": "POST",
            "params": {
                "ws_user_activation_status": {
                    "type": "integer",
                    "required": false,
                    "description": "Ws user activation status",
                    "min_value": 0,
                    "max_value": 1
                },
                "phone1": {
                    "type": "string",
                    "required": true,
                    "description": "Phone",
                    "max_length": 255
                },
                "password": {
                    "type": "string",
                    "required": false,
                    "description": "Password",
                    "max_length": 4000
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Login name",
                    "max_length": 255
                },
                "roles": {
                    "type": "reference",
                    "required": true,
                    "description": "Roles",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_role"
                            }
                        ]
                    }
                },
                "activity_level": {
                    "type": "integer",
                    "required": false,
                    "description": "Status",
                    "min_value": 0,
                    "max_value": 2
                },
                "user_activation_status": {
                    "type": "integer",
                    "required": false,
                    "description": "Status",
                    "min_value": 0,
                    "max_value": 2
                },
                "first_name": {
                    "type": "string",
                    "required": true,
                    "description": "First name",
                    "max_length": 255
                },
                "email": {
                    "type": "string",
                    "required": true,
                    "description": "Email",
                    "max_length": 255
                },
                "ldap_server_id": {
                    "type": "integer",
                    "required": false,
                    "description": "Ldap server id",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "last_name": {
                    "type": "string",
                    "required": true,
                    "description": "Last name",
                    "max_length": 255
                },
                "ldap_dn": {
                    "type": "string",
                    "required": false,
                    "description": "Ldap dn",
                    "max_length": 4000
                }
            },
            "description": "Create a single workspace user."
        },
        "create-bulk": {
            "url": "/workspace_users",
            "method": "POST",
            "params": {
                "ws_user_activation_status": {
                    "type": "integer",
                    "required": false,
                    "description": "Ws user activation status",
                    "min_value": 0,
                    "max_value": 1
                },
                "phone1": {
                    "type": "string",
                    "required": true,
                    "description": "Phone",
                    "max_length": 255
                },
                "password": {
                    "type": "string",
                    "required": false,
                    "description": "Password",
                    "max_length": 4000
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Login name",
                    "max_length": 255
                },
                "roles": {
                    "type": "reference",
                    "required": true,
                    "description": "Roles",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_role"
                            }
                        ]
                    }
                },
                "activity_level": {
                    "type": "integer",
                    "required": false,
                    "description": "Status",
                    "min_value": 0,
                    "max_value": 2
                },
                "user_activation_status": {
                    "type": "integer",
                    "required": false,
                    "description": "Status",
                    "min_value": 0,
                    "max_value": 2
                },
                "first_name": {
                    "type": "string",
                    "required": true,
                    "description": "First name",
                    "max_length": 255
                },
                "email": {
                    "type": "string",
                    "required": true,
                    "description": "Email",
                    "max_length": 255
                },
                "ldap_server_id": {
                    "type": "integer",
                    "required": false,
                    "description": "Ldap server id",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "last_name": {
                    "type": "string",
                    "required": true,
                    "description": "Last name",
                    "max_length": 255
                },
                "ldap_dn": {
                    "type": "string",
                    "required": false,
                    "description": "Ldap dn",
                    "max_length": 4000
                }
            },
            "description": "Create multiple workspace user."
        }
    },
    "teams": {
        "get-all": {
            "url": "/teams",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets teams list."
        },
        "get": {
            "url": "/teams/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single team."
        },
        "create": {
            "url": "/teams",
            "method": "POST",
            "params": {
                "assign_to_new_releases": {
                    "type": "boolean",
                    "required": false,
                    "description": "Assign to new releases"
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "estimated_velocity": {
                    "type": "integer",
                    "required": false,
                    "description": "Estimated velocity",
                    "min_value": 0,
                    "max_value": 9007199254740991
                },
                "planning_deadline": {
                    "type": "integer",
                    "required": false,
                    "description": "Planning deadline",
                    "min_value": 0,
                    "max_value": 9007199254740991
                },
                "releases": {
                    "type": "reference",
                    "required": false,
                    "description": "Releases",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                },
                "team_members": {
                    "type": "reference",
                    "required": false,
                    "description": "Team members",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "team_member"
                            }
                        ]
                    }
                },
                "team_lead": {
                    "type": "reference",
                    "required": false,
                    "description": "Team lead",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                }
            },
            "description": "Create a single team."
        },
        "create-bulk": {
            "url": "/teams",
            "method": "POST",
            "params": {
                "assign_to_new_releases": {
                    "type": "boolean",
                    "required": false,
                    "description": "Assign to new releases"
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "estimated_velocity": {
                    "type": "integer",
                    "required": false,
                    "description": "Estimated velocity",
                    "min_value": 0,
                    "max_value": 9007199254740991
                },
                "planning_deadline": {
                    "type": "integer",
                    "required": false,
                    "description": "Planning deadline",
                    "min_value": 0,
                    "max_value": 9007199254740991
                },
                "releases": {
                    "type": "reference",
                    "required": false,
                    "description": "Releases",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                },
                "team_members": {
                    "type": "reference",
                    "required": false,
                    "description": "Team members",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "team_member"
                            }
                        ]
                    }
                },
                "team_lead": {
                    "type": "reference",
                    "required": false,
                    "description": "Team lead",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                }
            },
            "description": "Create multiple team."
        },
        "update": {
            "url": "/teams/:id",
            "method": "PUT",
            "params": {
                "assign_to_new_releases": {
                    "type": "boolean",
                    "required": false,
                    "description": "Assign to new releases"
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "estimated_velocity": {
                    "type": "integer",
                    "required": false,
                    "description": "Estimated velocity",
                    "min_value": 0,
                    "max_value": 9007199254740991
                },
                "planning_deadline": {
                    "type": "integer",
                    "required": false,
                    "description": "Planning deadline",
                    "min_value": 0,
                    "max_value": 9007199254740991
                },
                "releases": {
                    "type": "reference",
                    "required": false,
                    "description": "Releases",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "team_lead": {
                    "type": "reference",
                    "required": false,
                    "description": "Team lead",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "$id": null
            },
            "description": "Update a single team."
        },
        "update-bulk": {
            "url": "/teams",
            "method": "PUT",
            "params": {
                "assign_to_new_releases": {
                    "type": "boolean",
                    "required": false,
                    "description": "Assign to new releases"
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "estimated_velocity": {
                    "type": "integer",
                    "required": false,
                    "description": "Estimated velocity",
                    "min_value": 0,
                    "max_value": 9007199254740991
                },
                "planning_deadline": {
                    "type": "integer",
                    "required": false,
                    "description": "Planning deadline",
                    "min_value": 0,
                    "max_value": 9007199254740991
                },
                "releases": {
                    "type": "reference",
                    "required": false,
                    "description": "Releases",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "team_lead": {
                    "type": "reference",
                    "required": false,
                    "description": "Team lead",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "$id": null
            },
            "description": "Update multiple team."
        },
        "delete": {
            "url": "/teams/:id",
            "method": "DELETE",
            "params": {
                "$id": null
            },
            "description": "Delete a single team."
        }
    },
    "test suite link to automateds": {
        "get-all": {
            "url": "/test_suite_link_to_automated_tests",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets test suite link to automateds list."
        },
        "get": {
            "url": "/test_suite_link_to_automated_tests/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single test suite link to automated."
        },
        "create": {
            "url": "/test_suite_link_to_automated_tests",
            "method": "POST",
            "params": {
                "test_suite": {
                    "type": "reference",
                    "required": true,
                    "description": "Test suite",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "test_suite"
                            }
                        ]
                    }
                },
                "test": {
                    "type": "reference",
                    "required": true,
                    "description": "Test",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "test_automated"
                            }
                        ]
                    }
                },
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                }
            },
            "description": "Create a single test suite link to automated."
        },
        "create-bulk": {
            "url": "/test_suite_link_to_automated_tests",
            "method": "POST",
            "params": {
                "test_suite": {
                    "type": "reference",
                    "required": true,
                    "description": "Test suite",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "test_suite"
                            }
                        ]
                    }
                },
                "test": {
                    "type": "reference",
                    "required": true,
                    "description": "Test",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "test_automated"
                            }
                        ]
                    }
                },
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                }
            },
            "description": "Create multiple test suite link to automated."
        },
        "update": {
            "url": "/test_suite_link_to_automated_tests/:id",
            "method": "PUT",
            "params": {
                "$id": null
            },
            "description": "Update a single test suite link to automated."
        },
        "update-bulk": {
            "url": "/test_suite_link_to_automated_tests",
            "method": "PUT",
            "params": {
                "$id": null
            },
            "description": "Update multiple test suite link to automated."
        },
        "delete": {
            "url": "/test_suite_link_to_automated_tests/:id",
            "method": "DELETE",
            "params": {
                "$id": null
            },
            "description": "Delete a single test suite link to automated."
        }
    },
    "taxonomy category nodes": {
        "get-all": {
            "url": "/taxonomy_category_nodes",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets taxonomy category nodes list."
        },
        "get": {
            "url": "/taxonomy_category_nodes/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single taxonomy category node."
        }
    },
    "ci servers": {
        "get-all": {
            "url": "/ci_servers",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets ci servers list."
        },
        "get": {
            "url": "/ci_servers/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single ci server."
        },
        "create": {
            "url": "/ci_servers",
            "method": "POST",
            "params": {
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "url": {
                    "type": "string",
                    "required": false,
                    "description": "URL",
                    "max_length": 255
                },
                "instance_id": {
                    "type": "string",
                    "required": false,
                    "description": "Instance ID",
                    "max_length": 255
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                },
                "server_type": {
                    "type": "string",
                    "required": false,
                    "description": "Server type",
                    "max_length": 255
                }
            },
            "description": "Create a single ci server."
        },
        "create-bulk": {
            "url": "/ci_servers",
            "method": "POST",
            "params": {
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "url": {
                    "type": "string",
                    "required": false,
                    "description": "URL",
                    "max_length": 255
                },
                "instance_id": {
                    "type": "string",
                    "required": false,
                    "description": "Instance ID",
                    "max_length": 255
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                },
                "server_type": {
                    "type": "string",
                    "required": false,
                    "description": "Server type",
                    "max_length": 255
                }
            },
            "description": "Create multiple ci server."
        },
        "update": {
            "url": "/ci_servers/:id",
            "method": "PUT",
            "params": {
                "url": {
                    "type": "string",
                    "required": false,
                    "description": "URL",
                    "max_length": 255
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "server_type": {
                    "type": "string",
                    "required": false,
                    "description": "Server type",
                    "max_length": 255
                },
                "$id": null
            },
            "description": "Update a single ci server."
        },
        "update-bulk": {
            "url": "/ci_servers",
            "method": "PUT",
            "params": {
                "url": {
                    "type": "string",
                    "required": false,
                    "description": "URL",
                    "max_length": 255
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "server_type": {
                    "type": "string",
                    "required": false,
                    "description": "Server type",
                    "max_length": 255
                },
                "$id": null
            },
            "description": "Update multiple ci server."
        },
        "delete": {
            "url": "/ci_servers/:id",
            "method": "DELETE",
            "params": {
                "$id": null
            },
            "description": "Delete a single ci server."
        }
    },
    "test suite link to manuals": {
        "get-all": {
            "url": "/test_suite_link_to_manual_tests",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets test suite link to manuals list."
        },
        "get": {
            "url": "/test_suite_link_to_manual_tests/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single test suite link to manual."
        },
        "create": {
            "url": "/test_suite_link_to_manual_tests",
            "method": "POST",
            "params": {
                "test_suite": {
                    "type": "reference",
                    "required": true,
                    "description": "Test suite",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "test_suite"
                            }
                        ]
                    }
                },
                "test": {
                    "type": "reference",
                    "required": true,
                    "description": "Test",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "test_manual"
                            },
                            {
                                "type": "gherkin_test"
                            }
                        ]
                    }
                },
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                }
            },
            "description": "Create a single test suite link to manual."
        },
        "create-bulk": {
            "url": "/test_suite_link_to_manual_tests",
            "method": "POST",
            "params": {
                "test_suite": {
                    "type": "reference",
                    "required": true,
                    "description": "Test suite",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "test_suite"
                            }
                        ]
                    }
                },
                "test": {
                    "type": "reference",
                    "required": true,
                    "description": "Test",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "test_manual"
                            },
                            {
                                "type": "gherkin_test"
                            }
                        ]
                    }
                },
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                }
            },
            "description": "Create multiple test suite link to manual."
        },
        "update": {
            "url": "/test_suite_link_to_manual_tests/:id",
            "method": "PUT",
            "params": {
                "$id": null
            },
            "description": "Update a single test suite link to manual."
        },
        "update-bulk": {
            "url": "/test_suite_link_to_manual_tests",
            "method": "PUT",
            "params": {
                "$id": null
            },
            "description": "Update multiple test suite link to manual."
        },
        "delete": {
            "url": "/test_suite_link_to_manual_tests/:id",
            "method": "DELETE",
            "params": {
                "$id": null
            },
            "description": "Delete a single test suite link to manual."
        }
    },
    "user items": {
        "get-all": {
            "url": "/user_items",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets user items list."
        },
        "get": {
            "url": "/user_items/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single user item."
        }
    },
    "defects": {
        "get-all": {
            "url": "/defects",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets defects list."
        },
        "get": {
            "url": "/defects/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single defect."
        },
        "create": {
            "url": "/defects",
            "method": "POST",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": true,
                    "description": "Feature",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "work_item_root"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "regression_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Regression",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "kzv70n8222rkwtk7x8dknpd5o",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "release": {
                    "type": "reference",
                    "required": false,
                    "description": "Target Release",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "auto_defect_hash_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Auto defect hash",
                    "max_length": 255
                },
                "detect_in_push_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Detected in Push",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "47vpz59085nd3udwldg70ywej",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "detected_in_push_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Detected in Push (old)",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "47vpz59085nd3udwldg70ywej",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "target_push_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Target push - obsolete",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "47vpz59085nd3udwldg70ywej",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "customer_encountered_udf": {
                    "type": "boolean",
                    "required": false,
                    "description": "Customer Encountered"
                },
                "doc_owner_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Doc Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "phase": {
                    "type": "reference",
                    "required": true,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "doc_phase_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Doc Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "ym7g6pvp3rgg7hx1pnw7k60n5",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "priority": {
                    "type": "reference",
                    "required": false,
                    "description": "Priority",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.priority",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "support_handling_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Support Handling",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "8pzmv625kwjj5i578w2j9n4ql",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "workaround_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Workaround",
                    "max_length": 1500
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "duplicate_of_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Duplicate Of",
                    "max_length": 255
                },
                "taxonomies": {
                    "type": "reference",
                    "required": false,
                    "description": "Environment",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "taxonomy_item_node"
                            }
                        ]
                    }
                },
                "fixed_in_push_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Fixed in Push (old)",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "47vpz59085nd3udwldg70ywej",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "cpe_handling_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "CPE Handling",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "8pzmv625kwjj5i578w2j9n4ql",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "attachments": {
                    "type": "reference",
                    "required": false,
                    "description": "Attachments",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "attachment"
                            }
                        ]
                    }
                },
                "fixed_in_releases_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Fixed In Releases",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "closure_code_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Resolution / Disposition",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "ledr5rv8rvy3vaqgn9zlj0ygj",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "internal_customer_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Internal Customer(legacy)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "2mk79k1d1ygrzsqk4g71ndxp0",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "ordering": {
                    "type": "object",
                    "required": false,
                    "description": "Ordering"
                },
                "security_impact_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Security Impact",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "43gw5yjwqdgd1srx9e2475ly1",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "fixed_on_date_udf": {
                    "type": "date_time",
                    "required": false,
                    "description": "Fixed on Date"
                },
                "fixed_in_build_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Fixed In Build",
                    "max_length": 255
                },
                "blocked": {
                    "type": "boolean",
                    "required": false,
                    "description": "Blocked"
                },
                "group_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Group",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "n56edn77jw20ear1woz7xklyw",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "story_points": {
                    "type": "integer",
                    "required": false,
                    "description": "Story points",
                    "min_value": 0,
                    "max_value": 9007199254740991
                },
                "linked_items2": {
                    "type": "reference",
                    "required": false,
                    "description": "Defect(Trace from)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "defect"
                            }
                        ]
                    }
                },
                "linked_items1": {
                    "type": "reference",
                    "required": false,
                    "description": "Linked Story",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            },
                            {
                                "type": "defect"
                            }
                        ]
                    }
                },
                "team": {
                    "type": "reference",
                    "required": false,
                    "description": "Team",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "team"
                            }
                        ]
                    }
                },
                "customers_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "7v128zzgmygq5urx3r9wg8lme",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "expectation_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Expectation",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "x3e701mgzkk72hk1qer170lr4",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "glln_type_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "G11N Type(legacy)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "v7lq9mn54g7w6cqj4l33zy05o",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "sprint": {
                    "type": "reference",
                    "required": false,
                    "description": "Sprint",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "sprint"
                            }
                        ]
                    }
                },
                "source_ids_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Source IDs",
                    "max_length": 255
                },
                "run": {
                    "type": "reference",
                    "required": false,
                    "description": "Run",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "run_suite"
                            },
                            {
                                "type": "run_automated"
                            },
                            {
                                "type": "run_manual"
                            },
                            {
                                "type": "gherkin_automated_run"
                            }
                        ]
                    }
                },
                "fixed_in_build": {
                    "type": "integer",
                    "required": false,
                    "description": "Fixed in build",
                    "min_value": 0,
                    "max_value": 9007199254740991
                },
                "fixed_on_udf": {
                    "type": "date_time",
                    "required": false,
                    "description": "Fixed On"
                },
                "holder_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Holder",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "wlom7krm3nknoi3ooqorqy8ex",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "customer_type_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer Type(legacy)",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "673yvl3rkkpkphknnogjlvowx",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "defect_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Defect type",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.defect_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "fix_in_push_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Fixed in Push",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "47vpz59085nd3udwldg70ywej",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "customer_resolution_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Customer Resolution",
                    "max_length": 1500
                },
                "run_step": {
                    "type": "reference",
                    "required": false,
                    "description": "Run step",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "run_step"
                            }
                        ]
                    }
                },
                "customer_call_date_udf": {
                    "type": "date_time",
                    "required": false,
                    "description": "Customer Call Date"
                },
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "product_areas": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "application_modules": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "customer_symptom_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Customer Symptom",
                    "max_length": 1500
                },
                "knowledge_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Knowledge ID",
                    "max_length": 255
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "escalation_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Escalation",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "oe7k9my8pzlgmc7r471q195z2",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "detected_in_build_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Detected In Build",
                    "max_length": 255
                },
                "due_date_udf": {
                    "type": "date_time",
                    "required": false,
                    "description": "Due Date"
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                },
                "customer_visible_udf": {
                    "type": "boolean",
                    "required": false,
                    "description": "Customer Visible"
                },
                "detected_in_build": {
                    "type": "integer",
                    "required": false,
                    "description": "Detected in build",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "gn_defect_type_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "G11N Defect Type",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "814r9ezyovmldbxwjl8dr90p7",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "detected_in_release": {
                    "type": "reference",
                    "required": false,
                    "description": "Detected In Release",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "knowledge_modified_udf": {
                    "type": "date_time",
                    "required": false,
                    "description": "Knowledge Modified"
                },
                "exists_in_release_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Exists In Releases",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "technical_resolution_udf": {
                    "type": "memo",
                    "required": false,
                    "description": "Technical Resolution"
                },
                "customer_said_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Customer SAID",
                    "max_length": 255
                },
                "detected_by": {
                    "type": "reference",
                    "required": false,
                    "description": "Detected by",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "qa_owner": {
                    "type": "reference",
                    "required": false,
                    "description": "QA owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "closed_on": {
                    "type": "date",
                    "required": false,
                    "description": "Closed on"
                },
                "ticket_number_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Ticket Number(legacy)",
                    "max_length": 255
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "severity": {
                    "type": "reference",
                    "required": false,
                    "description": "Severity",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.severity",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "requirements": {
                    "type": "reference",
                    "required": false,
                    "description": "Requirements",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "requirement_document"
                            }
                        ]
                    }
                },
                "issue_type_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Issue Type",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "8w5engxgvrkdpuzm0kpyp3oy4",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "found_in_branch_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Found in Git",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "968ldrr5z38mksqln0o1qd45r",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "depends_on_ids_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Depends on IDs",
                    "max_length": 255
                },
                "customer_contact_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer contact(legacy)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "blocked_reason": {
                    "type": "string",
                    "required": false,
                    "description": "Blocked reason",
                    "max_length": 255
                },
                "regression": {
                    "type": "string",
                    "required": false,
                    "description": "Regression(legacy)",
                    "max_length": 255
                },
                "customer_email_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Customer Email",
                    "max_length": 255
                },
                "post_release_udf": {
                    "type": "boolean",
                    "required": false,
                    "description": "Post Release"
                },
                "showstopper_udf": {
                    "type": "boolean",
                    "required": false,
                    "description": "Showstopper"
                }
            },
            "description": "Create a single defect."
        },
        "create-bulk": {
            "url": "/defects",
            "method": "POST",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": true,
                    "description": "Feature",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "work_item_root"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "regression_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Regression",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "kzv70n8222rkwtk7x8dknpd5o",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "release": {
                    "type": "reference",
                    "required": false,
                    "description": "Target Release",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "auto_defect_hash_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Auto defect hash",
                    "max_length": 255
                },
                "detect_in_push_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Detected in Push",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "47vpz59085nd3udwldg70ywej",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "detected_in_push_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Detected in Push (old)",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "47vpz59085nd3udwldg70ywej",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "target_push_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Target push - obsolete",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "47vpz59085nd3udwldg70ywej",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "customer_encountered_udf": {
                    "type": "boolean",
                    "required": false,
                    "description": "Customer Encountered"
                },
                "doc_owner_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Doc Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "phase": {
                    "type": "reference",
                    "required": true,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "doc_phase_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Doc Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "ym7g6pvp3rgg7hx1pnw7k60n5",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "priority": {
                    "type": "reference",
                    "required": false,
                    "description": "Priority",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.priority",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "support_handling_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Support Handling",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "8pzmv625kwjj5i578w2j9n4ql",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "workaround_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Workaround",
                    "max_length": 1500
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "duplicate_of_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Duplicate Of",
                    "max_length": 255
                },
                "taxonomies": {
                    "type": "reference",
                    "required": false,
                    "description": "Environment",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "taxonomy_item_node"
                            }
                        ]
                    }
                },
                "fixed_in_push_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Fixed in Push (old)",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "47vpz59085nd3udwldg70ywej",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "cpe_handling_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "CPE Handling",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "8pzmv625kwjj5i578w2j9n4ql",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "attachments": {
                    "type": "reference",
                    "required": false,
                    "description": "Attachments",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "attachment"
                            }
                        ]
                    }
                },
                "fixed_in_releases_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Fixed In Releases",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "closure_code_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Resolution / Disposition",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "ledr5rv8rvy3vaqgn9zlj0ygj",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "internal_customer_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Internal Customer(legacy)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "2mk79k1d1ygrzsqk4g71ndxp0",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "ordering": {
                    "type": "object",
                    "required": false,
                    "description": "Ordering"
                },
                "security_impact_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Security Impact",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "43gw5yjwqdgd1srx9e2475ly1",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "fixed_on_date_udf": {
                    "type": "date_time",
                    "required": false,
                    "description": "Fixed on Date"
                },
                "fixed_in_build_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Fixed In Build",
                    "max_length": 255
                },
                "blocked": {
                    "type": "boolean",
                    "required": false,
                    "description": "Blocked"
                },
                "group_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Group",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "n56edn77jw20ear1woz7xklyw",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "story_points": {
                    "type": "integer",
                    "required": false,
                    "description": "Story points",
                    "min_value": 0,
                    "max_value": 9007199254740991
                },
                "linked_items2": {
                    "type": "reference",
                    "required": false,
                    "description": "Defect(Trace from)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "defect"
                            }
                        ]
                    }
                },
                "linked_items1": {
                    "type": "reference",
                    "required": false,
                    "description": "Linked Story",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            },
                            {
                                "type": "defect"
                            }
                        ]
                    }
                },
                "team": {
                    "type": "reference",
                    "required": false,
                    "description": "Team",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "team"
                            }
                        ]
                    }
                },
                "customers_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "7v128zzgmygq5urx3r9wg8lme",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "expectation_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Expectation",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "x3e701mgzkk72hk1qer170lr4",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "glln_type_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "G11N Type(legacy)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "v7lq9mn54g7w6cqj4l33zy05o",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "sprint": {
                    "type": "reference",
                    "required": false,
                    "description": "Sprint",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "sprint"
                            }
                        ]
                    }
                },
                "source_ids_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Source IDs",
                    "max_length": 255
                },
                "run": {
                    "type": "reference",
                    "required": false,
                    "description": "Run",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "run_suite"
                            },
                            {
                                "type": "run_automated"
                            },
                            {
                                "type": "run_manual"
                            },
                            {
                                "type": "gherkin_automated_run"
                            }
                        ]
                    }
                },
                "fixed_in_build": {
                    "type": "integer",
                    "required": false,
                    "description": "Fixed in build",
                    "min_value": 0,
                    "max_value": 9007199254740991
                },
                "fixed_on_udf": {
                    "type": "date_time",
                    "required": false,
                    "description": "Fixed On"
                },
                "holder_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Holder",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "wlom7krm3nknoi3ooqorqy8ex",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "customer_type_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer Type(legacy)",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "673yvl3rkkpkphknnogjlvowx",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "defect_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Defect type",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.defect_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "fix_in_push_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Fixed in Push",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "47vpz59085nd3udwldg70ywej",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "customer_resolution_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Customer Resolution",
                    "max_length": 1500
                },
                "run_step": {
                    "type": "reference",
                    "required": false,
                    "description": "Run step",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "run_step"
                            }
                        ]
                    }
                },
                "customer_call_date_udf": {
                    "type": "date_time",
                    "required": false,
                    "description": "Customer Call Date"
                },
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "product_areas": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "application_modules": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "customer_symptom_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Customer Symptom",
                    "max_length": 1500
                },
                "knowledge_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Knowledge ID",
                    "max_length": 255
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "escalation_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Escalation",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "oe7k9my8pzlgmc7r471q195z2",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "detected_in_build_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Detected In Build",
                    "max_length": 255
                },
                "due_date_udf": {
                    "type": "date_time",
                    "required": false,
                    "description": "Due Date"
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                },
                "customer_visible_udf": {
                    "type": "boolean",
                    "required": false,
                    "description": "Customer Visible"
                },
                "detected_in_build": {
                    "type": "integer",
                    "required": false,
                    "description": "Detected in build",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "gn_defect_type_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "G11N Defect Type",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "814r9ezyovmldbxwjl8dr90p7",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "detected_in_release": {
                    "type": "reference",
                    "required": false,
                    "description": "Detected In Release",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "knowledge_modified_udf": {
                    "type": "date_time",
                    "required": false,
                    "description": "Knowledge Modified"
                },
                "exists_in_release_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Exists In Releases",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "technical_resolution_udf": {
                    "type": "memo",
                    "required": false,
                    "description": "Technical Resolution"
                },
                "customer_said_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Customer SAID",
                    "max_length": 255
                },
                "detected_by": {
                    "type": "reference",
                    "required": false,
                    "description": "Detected by",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "qa_owner": {
                    "type": "reference",
                    "required": false,
                    "description": "QA owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "closed_on": {
                    "type": "date",
                    "required": false,
                    "description": "Closed on"
                },
                "ticket_number_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Ticket Number(legacy)",
                    "max_length": 255
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "severity": {
                    "type": "reference",
                    "required": false,
                    "description": "Severity",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.severity",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "requirements": {
                    "type": "reference",
                    "required": false,
                    "description": "Requirements",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "requirement_document"
                            }
                        ]
                    }
                },
                "issue_type_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Issue Type",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "8w5engxgvrkdpuzm0kpyp3oy4",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "found_in_branch_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Found in Git",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "968ldrr5z38mksqln0o1qd45r",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "depends_on_ids_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Depends on IDs",
                    "max_length": 255
                },
                "customer_contact_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer contact(legacy)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "blocked_reason": {
                    "type": "string",
                    "required": false,
                    "description": "Blocked reason",
                    "max_length": 255
                },
                "regression": {
                    "type": "string",
                    "required": false,
                    "description": "Regression(legacy)",
                    "max_length": 255
                },
                "customer_email_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Customer Email",
                    "max_length": 255
                },
                "post_release_udf": {
                    "type": "boolean",
                    "required": false,
                    "description": "Post Release"
                },
                "showstopper_udf": {
                    "type": "boolean",
                    "required": false,
                    "description": "Showstopper"
                }
            },
            "description": "Create multiple defect."
        },
        "update": {
            "url": "/defects/:id",
            "method": "PUT",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": false,
                    "description": "Feature",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "work_item_root"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "regression_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Regression",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "kzv70n8222rkwtk7x8dknpd5o",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "release": {
                    "type": "reference",
                    "required": false,
                    "description": "Target Release",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "auto_defect_hash_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Auto defect hash",
                    "max_length": 255
                },
                "detect_in_push_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Detected in Push",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "47vpz59085nd3udwldg70ywej",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "detected_in_push_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Detected in Push (old)",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "47vpz59085nd3udwldg70ywej",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "target_push_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Target push - obsolete",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "47vpz59085nd3udwldg70ywej",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "customer_encountered_udf": {
                    "type": "boolean",
                    "required": false,
                    "description": "Customer Encountered"
                },
                "doc_owner_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Doc Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "phase": {
                    "type": "reference",
                    "required": false,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "doc_phase_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Doc Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "ym7g6pvp3rgg7hx1pnw7k60n5",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "priority": {
                    "type": "reference",
                    "required": false,
                    "description": "Priority",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.priority",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "support_handling_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Support Handling",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "8pzmv625kwjj5i578w2j9n4ql",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "workaround_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Workaround",
                    "max_length": 1500
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "duplicate_of_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Duplicate Of",
                    "max_length": 255
                },
                "taxonomies": {
                    "type": "reference",
                    "required": false,
                    "description": "Environment",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "taxonomy_item_node"
                            }
                        ]
                    }
                },
                "fixed_in_push_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Fixed in Push (old)",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "47vpz59085nd3udwldg70ywej",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "cpe_handling_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "CPE Handling",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "8pzmv625kwjj5i578w2j9n4ql",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "fixed_in_releases_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Fixed In Releases",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "closure_code_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Resolution / Disposition",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "ledr5rv8rvy3vaqgn9zlj0ygj",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "internal_customer_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Internal Customer(legacy)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "2mk79k1d1ygrzsqk4g71ndxp0",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "ordering": {
                    "type": "object",
                    "required": false,
                    "description": "Ordering"
                },
                "security_impact_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Security Impact",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "43gw5yjwqdgd1srx9e2475ly1",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "fixed_on_date_udf": {
                    "type": "date_time",
                    "required": false,
                    "description": "Fixed on Date"
                },
                "fixed_in_build_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Fixed In Build",
                    "max_length": 255
                },
                "blocked": {
                    "type": "boolean",
                    "required": false,
                    "description": "Blocked"
                },
                "group_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Group",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "n56edn77jw20ear1woz7xklyw",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "story_points": {
                    "type": "integer",
                    "required": false,
                    "description": "Story points",
                    "min_value": 0,
                    "max_value": 9007199254740991
                },
                "linked_items2": {
                    "type": "reference",
                    "required": false,
                    "description": "Defect(Trace from)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "defect"
                            }
                        ]
                    }
                },
                "linked_items1": {
                    "type": "reference",
                    "required": false,
                    "description": "Linked Story",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            },
                            {
                                "type": "defect"
                            }
                        ]
                    }
                },
                "team": {
                    "type": "reference",
                    "required": false,
                    "description": "Team",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "team"
                            }
                        ]
                    }
                },
                "customers_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "7v128zzgmygq5urx3r9wg8lme",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "expectation_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Expectation",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "x3e701mgzkk72hk1qer170lr4",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "glln_type_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "G11N Type(legacy)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "v7lq9mn54g7w6cqj4l33zy05o",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "sprint": {
                    "type": "reference",
                    "required": false,
                    "description": "Sprint",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "sprint"
                            }
                        ]
                    }
                },
                "source_ids_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Source IDs",
                    "max_length": 255
                },
                "run": {
                    "type": "reference",
                    "required": false,
                    "description": "Run",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "run_suite"
                            },
                            {
                                "type": "run_automated"
                            },
                            {
                                "type": "run_manual"
                            },
                            {
                                "type": "gherkin_automated_run"
                            }
                        ]
                    }
                },
                "fixed_in_build": {
                    "type": "integer",
                    "required": false,
                    "description": "Fixed in build",
                    "min_value": 0,
                    "max_value": 9007199254740991
                },
                "fixed_on_udf": {
                    "type": "date_time",
                    "required": false,
                    "description": "Fixed On"
                },
                "holder_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Holder",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "wlom7krm3nknoi3ooqorqy8ex",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "customer_type_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer Type(legacy)",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "673yvl3rkkpkphknnogjlvowx",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "defect_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Defect type",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.defect_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "fix_in_push_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Fixed in Push",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "47vpz59085nd3udwldg70ywej",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "customer_resolution_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Customer Resolution",
                    "max_length": 1500
                },
                "run_step": {
                    "type": "reference",
                    "required": false,
                    "description": "Run step",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "run_step"
                            }
                        ]
                    }
                },
                "customer_call_date_udf": {
                    "type": "date_time",
                    "required": false,
                    "description": "Customer Call Date"
                },
                "product_areas": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "application_modules": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "customer_symptom_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Customer Symptom",
                    "max_length": 1500
                },
                "knowledge_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Knowledge ID",
                    "max_length": 255
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "escalation_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Escalation",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "oe7k9my8pzlgmc7r471q195z2",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "detected_in_build_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Detected In Build",
                    "max_length": 255
                },
                "due_date_udf": {
                    "type": "date_time",
                    "required": false,
                    "description": "Due Date"
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "customer_visible_udf": {
                    "type": "boolean",
                    "required": false,
                    "description": "Customer Visible"
                },
                "detected_in_build": {
                    "type": "integer",
                    "required": false,
                    "description": "Detected in build",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "gn_defect_type_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "G11N Defect Type",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "814r9ezyovmldbxwjl8dr90p7",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "detected_in_release": {
                    "type": "reference",
                    "required": false,
                    "description": "Detected In Release",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "knowledge_modified_udf": {
                    "type": "date_time",
                    "required": false,
                    "description": "Knowledge Modified"
                },
                "exists_in_release_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Exists In Releases",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "technical_resolution_udf": {
                    "type": "memo",
                    "required": false,
                    "description": "Technical Resolution"
                },
                "customer_said_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Customer SAID",
                    "max_length": 255
                },
                "detected_by": {
                    "type": "reference",
                    "required": false,
                    "description": "Detected by",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "qa_owner": {
                    "type": "reference",
                    "required": false,
                    "description": "QA owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "closed_on": {
                    "type": "date",
                    "required": false,
                    "description": "Closed on"
                },
                "ticket_number_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Ticket Number(legacy)",
                    "max_length": 255
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "severity": {
                    "type": "reference",
                    "required": false,
                    "description": "Severity",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.severity",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "requirements": {
                    "type": "reference",
                    "required": false,
                    "description": "Requirements",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "requirement_document"
                            }
                        ]
                    }
                },
                "issue_type_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Issue Type",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "8w5engxgvrkdpuzm0kpyp3oy4",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "found_in_branch_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Found in Git",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "968ldrr5z38mksqln0o1qd45r",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "depends_on_ids_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Depends on IDs",
                    "max_length": 255
                },
                "customer_contact_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer contact(legacy)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "blocked_reason": {
                    "type": "string",
                    "required": false,
                    "description": "Blocked reason",
                    "max_length": 255
                },
                "regression": {
                    "type": "string",
                    "required": false,
                    "description": "Regression(legacy)",
                    "max_length": 255
                },
                "customer_email_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Customer Email",
                    "max_length": 255
                },
                "post_release_udf": {
                    "type": "boolean",
                    "required": false,
                    "description": "Post Release"
                },
                "showstopper_udf": {
                    "type": "boolean",
                    "required": false,
                    "description": "Showstopper"
                },
                "$id": null
            },
            "description": "Update a single defect."
        },
        "update-bulk": {
            "url": "/defects",
            "method": "PUT",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": false,
                    "description": "Feature",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "work_item_root"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "regression_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Regression",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "kzv70n8222rkwtk7x8dknpd5o",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "release": {
                    "type": "reference",
                    "required": false,
                    "description": "Target Release",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "auto_defect_hash_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Auto defect hash",
                    "max_length": 255
                },
                "detect_in_push_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Detected in Push",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "47vpz59085nd3udwldg70ywej",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "detected_in_push_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Detected in Push (old)",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "47vpz59085nd3udwldg70ywej",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "target_push_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Target push - obsolete",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "47vpz59085nd3udwldg70ywej",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "customer_encountered_udf": {
                    "type": "boolean",
                    "required": false,
                    "description": "Customer Encountered"
                },
                "doc_owner_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Doc Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "phase": {
                    "type": "reference",
                    "required": false,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "doc_phase_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Doc Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "ym7g6pvp3rgg7hx1pnw7k60n5",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "priority": {
                    "type": "reference",
                    "required": false,
                    "description": "Priority",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.priority",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "support_handling_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Support Handling",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "8pzmv625kwjj5i578w2j9n4ql",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "workaround_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Workaround",
                    "max_length": 1500
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "duplicate_of_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Duplicate Of",
                    "max_length": 255
                },
                "taxonomies": {
                    "type": "reference",
                    "required": false,
                    "description": "Environment",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "taxonomy_item_node"
                            }
                        ]
                    }
                },
                "fixed_in_push_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Fixed in Push (old)",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "47vpz59085nd3udwldg70ywej",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "cpe_handling_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "CPE Handling",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "8pzmv625kwjj5i578w2j9n4ql",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "fixed_in_releases_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Fixed In Releases",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "closure_code_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Resolution / Disposition",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "ledr5rv8rvy3vaqgn9zlj0ygj",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "internal_customer_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Internal Customer(legacy)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "2mk79k1d1ygrzsqk4g71ndxp0",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "ordering": {
                    "type": "object",
                    "required": false,
                    "description": "Ordering"
                },
                "security_impact_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Security Impact",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "43gw5yjwqdgd1srx9e2475ly1",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "fixed_on_date_udf": {
                    "type": "date_time",
                    "required": false,
                    "description": "Fixed on Date"
                },
                "fixed_in_build_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Fixed In Build",
                    "max_length": 255
                },
                "blocked": {
                    "type": "boolean",
                    "required": false,
                    "description": "Blocked"
                },
                "group_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Group",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "n56edn77jw20ear1woz7xklyw",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "story_points": {
                    "type": "integer",
                    "required": false,
                    "description": "Story points",
                    "min_value": 0,
                    "max_value": 9007199254740991
                },
                "linked_items2": {
                    "type": "reference",
                    "required": false,
                    "description": "Defect(Trace from)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "defect"
                            }
                        ]
                    }
                },
                "linked_items1": {
                    "type": "reference",
                    "required": false,
                    "description": "Linked Story",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            },
                            {
                                "type": "defect"
                            }
                        ]
                    }
                },
                "team": {
                    "type": "reference",
                    "required": false,
                    "description": "Team",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "team"
                            }
                        ]
                    }
                },
                "customers_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "7v128zzgmygq5urx3r9wg8lme",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "expectation_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Expectation",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "x3e701mgzkk72hk1qer170lr4",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "glln_type_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "G11N Type(legacy)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "v7lq9mn54g7w6cqj4l33zy05o",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "sprint": {
                    "type": "reference",
                    "required": false,
                    "description": "Sprint",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "sprint"
                            }
                        ]
                    }
                },
                "source_ids_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Source IDs",
                    "max_length": 255
                },
                "run": {
                    "type": "reference",
                    "required": false,
                    "description": "Run",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "run_suite"
                            },
                            {
                                "type": "run_automated"
                            },
                            {
                                "type": "run_manual"
                            },
                            {
                                "type": "gherkin_automated_run"
                            }
                        ]
                    }
                },
                "fixed_in_build": {
                    "type": "integer",
                    "required": false,
                    "description": "Fixed in build",
                    "min_value": 0,
                    "max_value": 9007199254740991
                },
                "fixed_on_udf": {
                    "type": "date_time",
                    "required": false,
                    "description": "Fixed On"
                },
                "holder_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Holder",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "wlom7krm3nknoi3ooqorqy8ex",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "customer_type_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer Type(legacy)",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "673yvl3rkkpkphknnogjlvowx",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "defect_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Defect type",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.defect_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "fix_in_push_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Fixed in Push",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "47vpz59085nd3udwldg70ywej",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "customer_resolution_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Customer Resolution",
                    "max_length": 1500
                },
                "run_step": {
                    "type": "reference",
                    "required": false,
                    "description": "Run step",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "run_step"
                            }
                        ]
                    }
                },
                "customer_call_date_udf": {
                    "type": "date_time",
                    "required": false,
                    "description": "Customer Call Date"
                },
                "product_areas": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "application_modules": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "customer_symptom_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Customer Symptom",
                    "max_length": 1500
                },
                "knowledge_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Knowledge ID",
                    "max_length": 255
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "escalation_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Escalation",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "oe7k9my8pzlgmc7r471q195z2",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "detected_in_build_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Detected In Build",
                    "max_length": 255
                },
                "due_date_udf": {
                    "type": "date_time",
                    "required": false,
                    "description": "Due Date"
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "customer_visible_udf": {
                    "type": "boolean",
                    "required": false,
                    "description": "Customer Visible"
                },
                "detected_in_build": {
                    "type": "integer",
                    "required": false,
                    "description": "Detected in build",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "gn_defect_type_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "G11N Defect Type",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "814r9ezyovmldbxwjl8dr90p7",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "detected_in_release": {
                    "type": "reference",
                    "required": false,
                    "description": "Detected In Release",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "knowledge_modified_udf": {
                    "type": "date_time",
                    "required": false,
                    "description": "Knowledge Modified"
                },
                "exists_in_release_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Exists In Releases",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "technical_resolution_udf": {
                    "type": "memo",
                    "required": false,
                    "description": "Technical Resolution"
                },
                "customer_said_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Customer SAID",
                    "max_length": 255
                },
                "detected_by": {
                    "type": "reference",
                    "required": false,
                    "description": "Detected by",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "qa_owner": {
                    "type": "reference",
                    "required": false,
                    "description": "QA owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "closed_on": {
                    "type": "date",
                    "required": false,
                    "description": "Closed on"
                },
                "ticket_number_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Ticket Number(legacy)",
                    "max_length": 255
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "severity": {
                    "type": "reference",
                    "required": false,
                    "description": "Severity",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.severity",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "requirements": {
                    "type": "reference",
                    "required": false,
                    "description": "Requirements",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "requirement_document"
                            }
                        ]
                    }
                },
                "issue_type_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Issue Type",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "8w5engxgvrkdpuzm0kpyp3oy4",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "found_in_branch_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Found in Git",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "968ldrr5z38mksqln0o1qd45r",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "depends_on_ids_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Depends on IDs",
                    "max_length": 255
                },
                "customer_contact_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Customer contact(legacy)",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "blocked_reason": {
                    "type": "string",
                    "required": false,
                    "description": "Blocked reason",
                    "max_length": 255
                },
                "regression": {
                    "type": "string",
                    "required": false,
                    "description": "Regression(legacy)",
                    "max_length": 255
                },
                "customer_email_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Customer Email",
                    "max_length": 255
                },
                "post_release_udf": {
                    "type": "boolean",
                    "required": false,
                    "description": "Post Release"
                },
                "showstopper_udf": {
                    "type": "boolean",
                    "required": false,
                    "description": "Showstopper"
                },
                "$id": null
            },
            "description": "Update multiple defect."
        },
        "delete": {
            "url": "/defects/:id",
            "method": "DELETE",
            "params": {
                "$id": null
            },
            "description": "Delete a single defect."
        }
    },
    "run steps": {
        "get-all": {
            "url": "/run_steps",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets run steps list."
        },
        "get": {
            "url": "/run_steps/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single run step."
        },
        "update": {
            "url": "/run_steps/:id",
            "method": "PUT",
            "params": {
                "actual": {
                    "type": "object",
                    "required": false,
                    "description": "Actual"
                },
                "step_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Step type",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.manual_test_run_step_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "run": {
                    "type": "reference",
                    "required": false,
                    "description": "Run",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "run_manual"
                            }
                        ]
                    }
                },
                "result": {
                    "type": "reference",
                    "required": false,
                    "description": "Result",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.run_native_status",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "defect": {
                    "type": "reference",
                    "required": false,
                    "description": "Defect",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "defect"
                            }
                        ]
                    }
                },
                "order": {
                    "type": "integer",
                    "required": false,
                    "description": "Order",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "$id": null
            },
            "description": "Update a single run step."
        },
        "update-bulk": {
            "url": "/run_steps",
            "method": "PUT",
            "params": {
                "actual": {
                    "type": "object",
                    "required": false,
                    "description": "Actual"
                },
                "step_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Step type",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.manual_test_run_step_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "run": {
                    "type": "reference",
                    "required": false,
                    "description": "Run",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "run_manual"
                            }
                        ]
                    }
                },
                "result": {
                    "type": "reference",
                    "required": false,
                    "description": "Result",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.run_native_status",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "defect": {
                    "type": "reference",
                    "required": false,
                    "description": "Defect",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "defect"
                            }
                        ]
                    }
                },
                "order": {
                    "type": "integer",
                    "required": false,
                    "description": "Order",
                    "min_value": -9007199254740991,
                    "max_value": 9007199254740991
                },
                "$id": null
            },
            "description": "Update multiple run step."
        }
    },
    "phases": {
        "get-all": {
            "url": "/phases",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets phases list."
        },
        "get": {
            "url": "/phases/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single phase."
        },
        "create": {
            "url": "/phases",
            "method": "POST",
            "params": {
                "master_phase": {
                    "type": "reference",
                    "required": false,
                    "description": "Master phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "is_start_phase": {
                    "type": "boolean",
                    "required": false,
                    "description": "Is start phase"
                },
                "description": {
                    "type": "string",
                    "required": false,
                    "description": "Description",
                    "max_length": 255
                },
                "activity_level": {
                    "type": "integer",
                    "required": false,
                    "description": "Activity level",
                    "min_value": 0,
                    "max_value": 2
                },
                "user_activation_status": {
                    "type": "integer",
                    "required": false,
                    "description": "Activity level",
                    "min_value": 0,
                    "max_value": 2
                },
                "sub_phases": {
                    "type": "reference",
                    "required": false,
                    "description": "Sub phases",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                },
                "metaphase": {
                    "type": "reference",
                    "required": false,
                    "description": "Metaphase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "metaphase"
                            }
                        ]
                    }
                },
                "entity": {
                    "type": "string",
                    "required": true,
                    "description": "Entity",
                    "max_length": 255
                }
            },
            "description": "Create a single phase."
        },
        "create-bulk": {
            "url": "/phases",
            "method": "POST",
            "params": {
                "master_phase": {
                    "type": "reference",
                    "required": false,
                    "description": "Master phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "is_start_phase": {
                    "type": "boolean",
                    "required": false,
                    "description": "Is start phase"
                },
                "description": {
                    "type": "string",
                    "required": false,
                    "description": "Description",
                    "max_length": 255
                },
                "activity_level": {
                    "type": "integer",
                    "required": false,
                    "description": "Activity level",
                    "min_value": 0,
                    "max_value": 2
                },
                "user_activation_status": {
                    "type": "integer",
                    "required": false,
                    "description": "Activity level",
                    "min_value": 0,
                    "max_value": 2
                },
                "sub_phases": {
                    "type": "reference",
                    "required": false,
                    "description": "Sub phases",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                },
                "metaphase": {
                    "type": "reference",
                    "required": false,
                    "description": "Metaphase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "metaphase"
                            }
                        ]
                    }
                },
                "entity": {
                    "type": "string",
                    "required": true,
                    "description": "Entity",
                    "max_length": 255
                }
            },
            "description": "Create multiple phase."
        },
        "update": {
            "url": "/phases/:id",
            "method": "PUT",
            "params": {
                "is_start_phase": {
                    "type": "boolean",
                    "required": false,
                    "description": "Is start phase"
                },
                "description": {
                    "type": "string",
                    "required": false,
                    "description": "Description",
                    "max_length": 255
                },
                "activity_level": {
                    "type": "integer",
                    "required": false,
                    "description": "Activity level",
                    "min_value": 0,
                    "max_value": 2
                },
                "user_activation_status": {
                    "type": "integer",
                    "required": false,
                    "description": "Activity level",
                    "min_value": 0,
                    "max_value": 2
                },
                "sub_phases": {
                    "type": "reference",
                    "required": false,
                    "description": "Sub phases",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "metaphase": {
                    "type": "reference",
                    "required": false,
                    "description": "Metaphase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "metaphase"
                            }
                        ]
                    }
                },
                "$id": null
            },
            "description": "Update a single phase."
        },
        "update-bulk": {
            "url": "/phases",
            "method": "PUT",
            "params": {
                "is_start_phase": {
                    "type": "boolean",
                    "required": false,
                    "description": "Is start phase"
                },
                "description": {
                    "type": "string",
                    "required": false,
                    "description": "Description",
                    "max_length": 255
                },
                "activity_level": {
                    "type": "integer",
                    "required": false,
                    "description": "Activity level",
                    "min_value": 0,
                    "max_value": 2
                },
                "user_activation_status": {
                    "type": "integer",
                    "required": false,
                    "description": "Activity level",
                    "min_value": 0,
                    "max_value": 2
                },
                "sub_phases": {
                    "type": "reference",
                    "required": false,
                    "description": "Sub phases",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "metaphase": {
                    "type": "reference",
                    "required": false,
                    "description": "Metaphase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "metaphase"
                            }
                        ]
                    }
                },
                "$id": null
            },
            "description": "Update multiple phase."
        }
    },
    "requirement folders": {
        "get-all": {
            "url": "/requirement_folders",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets requirement folders list."
        },
        "get": {
            "url": "/requirement_folders/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single requirement folder."
        },
        "create": {
            "url": "/requirement_folders",
            "method": "POST",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": true,
                    "description": "Parent",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "requirement_folder"
                            },
                            {
                                "type": "requirement_root"
                            }
                        ]
                    }
                },
                "attachments": {
                    "type": "reference",
                    "required": false,
                    "description": "Attachments",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "attachment"
                            }
                        ]
                    }
                },
                "ordering": {
                    "type": "object",
                    "required": false,
                    "description": "Ordering"
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                }
            },
            "description": "Create a single requirement folder."
        },
        "create-bulk": {
            "url": "/requirement_folders",
            "method": "POST",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": true,
                    "description": "Parent",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "requirement_folder"
                            },
                            {
                                "type": "requirement_root"
                            }
                        ]
                    }
                },
                "attachments": {
                    "type": "reference",
                    "required": false,
                    "description": "Attachments",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "attachment"
                            }
                        ]
                    }
                },
                "ordering": {
                    "type": "object",
                    "required": false,
                    "description": "Ordering"
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                }
            },
            "description": "Create multiple requirement folder."
        },
        "update": {
            "url": "/requirement_folders/:id",
            "method": "PUT",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": false,
                    "description": "Parent",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "requirement_folder"
                            },
                            {
                                "type": "requirement_root"
                            }
                        ]
                    }
                },
                "ordering": {
                    "type": "object",
                    "required": false,
                    "description": "Ordering"
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "$id": null
            },
            "description": "Update a single requirement folder."
        },
        "update-bulk": {
            "url": "/requirement_folders",
            "method": "PUT",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": false,
                    "description": "Parent",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "requirement_folder"
                            },
                            {
                                "type": "requirement_root"
                            }
                        ]
                    }
                },
                "ordering": {
                    "type": "object",
                    "required": false,
                    "description": "Ordering"
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "$id": null
            },
            "description": "Update multiple requirement folder."
        },
        "delete": {
            "url": "/requirement_folders/:id",
            "method": "DELETE",
            "params": {
                "$id": null
            },
            "description": "Delete a single requirement folder."
        }
    },
    "product areas": {
        "get-all": {
            "url": "/product_areas",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets product areas list."
        },
        "get": {
            "url": "/product_areas/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single product area."
        },
        "create": {
            "url": "/product_areas",
            "method": "POST",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": true,
                    "description": "Parent",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "team_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Team",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "team"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "children": {
                    "type": "reference",
                    "required": false,
                    "description": "Children",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                }
            },
            "description": "Create a single product area."
        },
        "create-bulk": {
            "url": "/product_areas",
            "method": "POST",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": true,
                    "description": "Parent",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "team_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Team",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "team"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "children": {
                    "type": "reference",
                    "required": false,
                    "description": "Children",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                }
            },
            "description": "Create multiple product area."
        },
        "update": {
            "url": "/product_areas/:id",
            "method": "PUT",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": false,
                    "description": "Parent",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "team_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Team",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "team"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "children": {
                    "type": "reference",
                    "required": false,
                    "description": "Children",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "$id": null
            },
            "description": "Update a single product area."
        },
        "update-bulk": {
            "url": "/product_areas",
            "method": "PUT",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": false,
                    "description": "Parent",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "team_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Team",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "team"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "children": {
                    "type": "reference",
                    "required": false,
                    "description": "Children",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "$id": null
            },
            "description": "Update multiple product area."
        },
        "delete": {
            "url": "/product_areas/:id",
            "method": "DELETE",
            "params": {
                "$id": null
            },
            "description": "Delete a single product area."
        }
    },
    "application modules": {
        "get-all": {
            "url": "/application_modules",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets application modules list."
        },
        "get": {
            "url": "/application_modules/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single application module."
        },
        "create": {
            "url": "/application_modules",
            "method": "POST",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": true,
                    "description": "Parent",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "team_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Team",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "children": {
                    "type": "reference",
                    "required": false,
                    "description": "Children",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                }
            },
            "description": "Create a single application module."
        },
        "create-bulk": {
            "url": "/application_modules",
            "method": "POST",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": true,
                    "description": "Parent",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "team_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Team",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "children": {
                    "type": "reference",
                    "required": false,
                    "description": "Children",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                }
            },
            "description": "Create multiple application module."
        },
        "update": {
            "url": "/application_modules/:id",
            "method": "PUT",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": false,
                    "description": "Parent",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "team_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Team",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "children": {
                    "type": "reference",
                    "required": false,
                    "description": "Children",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "$id": null
            },
            "description": "Update a single application module."
        },
        "update-bulk": {
            "url": "/application_modules",
            "method": "PUT",
            "params": {
                "parent": {
                    "type": "reference",
                    "required": false,
                    "description": "Parent",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "team_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Team",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "children": {
                    "type": "reference",
                    "required": false,
                    "description": "Children",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "$id": null
            },
            "description": "Update multiple application module."
        },
        "delete": {
            "url": "/application_modules/:id",
            "method": "DELETE",
            "params": {
                "$id": null
            },
            "description": "Delete a single application module."
        }
    },
    "tasks": {
        "get-all": {
            "url": "/tasks",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets tasks list."
        },
        "get": {
            "url": "/tasks/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single task."
        },
        "create": {
            "url": "/tasks",
            "method": "POST",
            "params": {
                "attachments": {
                    "type": "reference",
                    "required": false,
                    "description": "Attachments",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "attachment"
                            }
                        ]
                    }
                },
                "item_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Type",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.task_item_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "invested_hours": {
                    "type": "integer",
                    "required": false,
                    "description": "Invested hours",
                    "min_value": 0,
                    "max_value": 1000
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "phase": {
                    "type": "reference",
                    "required": true,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "remaining_hours": {
                    "type": "integer",
                    "required": false,
                    "description": "Remaining hours",
                    "min_value": 0,
                    "max_value": 1000
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "estimated_hours": {
                    "type": "integer",
                    "required": false,
                    "description": "Estimated hours",
                    "min_value": 0,
                    "max_value": 1000
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                },
                "story": {
                    "type": "reference",
                    "required": true,
                    "description": "Story",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "quality_story"
                            },
                            {
                                "type": "defect"
                            }
                        ]
                    }
                }
            },
            "description": "Create a single task."
        },
        "create-bulk": {
            "url": "/tasks",
            "method": "POST",
            "params": {
                "attachments": {
                    "type": "reference",
                    "required": false,
                    "description": "Attachments",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "attachment"
                            }
                        ]
                    }
                },
                "item_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Type",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.task_item_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "invested_hours": {
                    "type": "integer",
                    "required": false,
                    "description": "Invested hours",
                    "min_value": 0,
                    "max_value": 1000
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "phase": {
                    "type": "reference",
                    "required": true,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "remaining_hours": {
                    "type": "integer",
                    "required": false,
                    "description": "Remaining hours",
                    "min_value": 0,
                    "max_value": 1000
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "estimated_hours": {
                    "type": "integer",
                    "required": false,
                    "description": "Estimated hours",
                    "min_value": 0,
                    "max_value": 1000
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                },
                "story": {
                    "type": "reference",
                    "required": true,
                    "description": "Story",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "quality_story"
                            },
                            {
                                "type": "defect"
                            }
                        ]
                    }
                }
            },
            "description": "Create multiple task."
        },
        "update": {
            "url": "/tasks/:id",
            "method": "PUT",
            "params": {
                "item_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Type",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.task_item_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "invested_hours": {
                    "type": "integer",
                    "required": false,
                    "description": "Invested hours",
                    "min_value": 0,
                    "max_value": 1000
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "phase": {
                    "type": "reference",
                    "required": false,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "remaining_hours": {
                    "type": "integer",
                    "required": false,
                    "description": "Remaining hours",
                    "min_value": 0,
                    "max_value": 1000
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "estimated_hours": {
                    "type": "integer",
                    "required": false,
                    "description": "Estimated hours",
                    "min_value": 0,
                    "max_value": 1000
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "story": {
                    "type": "reference",
                    "required": false,
                    "description": "Story",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "quality_story"
                            },
                            {
                                "type": "defect"
                            }
                        ]
                    }
                },
                "$id": null
            },
            "description": "Update a single task."
        },
        "update-bulk": {
            "url": "/tasks",
            "method": "PUT",
            "params": {
                "item_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Type",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.task_item_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "invested_hours": {
                    "type": "integer",
                    "required": false,
                    "description": "Invested hours",
                    "min_value": 0,
                    "max_value": 1000
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "phase": {
                    "type": "reference",
                    "required": false,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "remaining_hours": {
                    "type": "integer",
                    "required": false,
                    "description": "Remaining hours",
                    "min_value": 0,
                    "max_value": 1000
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "estimated_hours": {
                    "type": "integer",
                    "required": false,
                    "description": "Estimated hours",
                    "min_value": 0,
                    "max_value": 1000
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "story": {
                    "type": "reference",
                    "required": false,
                    "description": "Story",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "quality_story"
                            },
                            {
                                "type": "defect"
                            }
                        ]
                    }
                },
                "$id": null
            },
            "description": "Update multiple task."
        },
        "delete": {
            "url": "/tasks/:id",
            "method": "DELETE",
            "params": {
                "$id": null
            },
            "description": "Delete a single task."
        }
    },
    "requirement roots": {
        "get-all": {
            "url": "/requirement_roots",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets requirement roots list."
        },
        "get": {
            "url": "/requirement_roots/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single requirement root."
        }
    },
    "user tags": {
        "get-all": {
            "url": "/user_tags",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets user tags list."
        },
        "get": {
            "url": "/user_tags/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single user tag."
        },
        "create": {
            "url": "/user_tags",
            "method": "POST",
            "params": {
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                }
            },
            "description": "Create a single user tag."
        },
        "create-bulk": {
            "url": "/user_tags",
            "method": "POST",
            "params": {
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                }
            },
            "description": "Create multiple user tag."
        }
    },
    "gherkin tests": {
        "get-all": {
            "url": "/gherkin_tests",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets gherkin tests list."
        },
        "get": {
            "url": "/gherkin_tests/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single gherkin test."
        },
        "create": {
            "url": "/gherkin_tests",
            "method": "POST",
            "params": {
                "covered_content": {
                    "type": "reference",
                    "required": false,
                    "description": "Backlog Coverage",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "backlog_coverage": {
                    "type": "reference",
                    "required": false,
                    "description": "Backlog Coverage",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "phase": {
                    "type": "reference",
                    "required": true,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "product_areas": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "application_modules": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "estimated_duration": {
                    "type": "integer",
                    "required": false,
                    "description": "Estimated duration (minutes)",
                    "min_value": 1,
                    "max_value": 7000
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                },
                "automation_status": {
                    "type": "reference",
                    "required": false,
                    "description": "Automation status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.automation_status",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "attachments": {
                    "type": "reference",
                    "required": false,
                    "description": "Attachments",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "attachment"
                            }
                        ]
                    }
                },
                "team_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Team",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "team"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "designer": {
                    "type": "reference",
                    "required": false,
                    "description": "Designer",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "covered_requirement": {
                    "type": "reference",
                    "required": false,
                    "description": "Covered requirement",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "requirement_document"
                            }
                        ]
                    }
                },
                "test_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Test type",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "list_node.test_type",
                                "type": "list_node"
                            }
                        ]
                    }
                }
            },
            "description": "Create a single gherkin test."
        },
        "create-bulk": {
            "url": "/gherkin_tests",
            "method": "POST",
            "params": {
                "covered_content": {
                    "type": "reference",
                    "required": false,
                    "description": "Backlog Coverage",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "backlog_coverage": {
                    "type": "reference",
                    "required": false,
                    "description": "Backlog Coverage",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "phase": {
                    "type": "reference",
                    "required": true,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "author": {
                    "type": "reference",
                    "required": false,
                    "description": "Author",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "product_areas": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "application_modules": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "estimated_duration": {
                    "type": "integer",
                    "required": false,
                    "description": "Estimated duration (minutes)",
                    "min_value": 1,
                    "max_value": 7000
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                },
                "automation_status": {
                    "type": "reference",
                    "required": false,
                    "description": "Automation status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.automation_status",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "attachments": {
                    "type": "reference",
                    "required": false,
                    "description": "Attachments",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "attachment"
                            }
                        ]
                    }
                },
                "team_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Team",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "team"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "designer": {
                    "type": "reference",
                    "required": false,
                    "description": "Designer",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "covered_requirement": {
                    "type": "reference",
                    "required": false,
                    "description": "Covered requirement",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "requirement_document"
                            }
                        ]
                    }
                },
                "test_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Test type",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "list_node.test_type",
                                "type": "list_node"
                            }
                        ]
                    }
                }
            },
            "description": "Create multiple gherkin test."
        },
        "update": {
            "url": "/gherkin_tests/:id",
            "method": "PUT",
            "params": {
                "covered_content": {
                    "type": "reference",
                    "required": false,
                    "description": "Backlog Coverage",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "backlog_coverage": {
                    "type": "reference",
                    "required": false,
                    "description": "Backlog Coverage",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "phase": {
                    "type": "reference",
                    "required": false,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "product_areas": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "application_modules": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "estimated_duration": {
                    "type": "integer",
                    "required": false,
                    "description": "Estimated duration (minutes)",
                    "min_value": 1,
                    "max_value": 7000
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "automation_status": {
                    "type": "reference",
                    "required": false,
                    "description": "Automation status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.automation_status",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "team_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Team",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "team"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "designer": {
                    "type": "reference",
                    "required": false,
                    "description": "Designer",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "covered_requirement": {
                    "type": "reference",
                    "required": false,
                    "description": "Covered requirement",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "requirement_document"
                            }
                        ]
                    }
                },
                "test_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Test type",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "list_node.test_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "$id": null
            },
            "description": "Update a single gherkin test."
        },
        "update-bulk": {
            "url": "/gherkin_tests",
            "method": "PUT",
            "params": {
                "covered_content": {
                    "type": "reference",
                    "required": false,
                    "description": "Backlog Coverage",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "backlog_coverage": {
                    "type": "reference",
                    "required": false,
                    "description": "Backlog Coverage",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "story"
                            },
                            {
                                "type": "feature"
                            }
                        ]
                    }
                },
                "global_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Global ID",
                    "max_length": 255
                },
                "phase": {
                    "type": "reference",
                    "required": false,
                    "description": "Phase",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "phase"
                            }
                        ]
                    }
                },
                "product_areas": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "product_area"
                            }
                        ]
                    }
                },
                "application_modules": {
                    "type": "reference",
                    "required": false,
                    "description": "Application modules",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "application_module"
                            }
                        ]
                    }
                },
                "estimated_duration": {
                    "type": "integer",
                    "required": false,
                    "description": "Estimated duration (minutes)",
                    "min_value": 1,
                    "max_value": 7000
                },
                "legacy_id_udf": {
                    "type": "string",
                    "required": false,
                    "description": "Legacy ID",
                    "max_length": 255
                },
                "user_tags": {
                    "type": "reference",
                    "required": false,
                    "description": "Tags",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "user_tag"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "automation_status": {
                    "type": "reference",
                    "required": false,
                    "description": "Automation status",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "logical_name": "list_node.automation_status",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "team_udf": {
                    "type": "reference",
                    "required": false,
                    "description": "Team",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "team"
                            }
                        ]
                    }
                },
                "description": {
                    "type": "memo",
                    "required": false,
                    "description": "Description"
                },
                "owner": {
                    "type": "reference",
                    "required": false,
                    "description": "Owner",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "designer": {
                    "type": "reference",
                    "required": false,
                    "description": "Designer",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "workspace_user"
                            }
                        ]
                    }
                },
                "covered_requirement": {
                    "type": "reference",
                    "required": false,
                    "description": "Covered requirement",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "type": "requirement_document"
                            }
                        ]
                    }
                },
                "test_type": {
                    "type": "reference",
                    "required": false,
                    "description": "Test type",
                    "field_type_data": {
                        "multiple": true,
                        "targets": [
                            {
                                "logical_name": "list_node.test_type",
                                "type": "list_node"
                            }
                        ]
                    }
                },
                "$id": null
            },
            "description": "Update multiple gherkin test."
        },
        "delete": {
            "url": "/gherkin_tests/:id",
            "method": "DELETE",
            "params": {
                "$id": null
            },
            "description": "Delete a single gherkin test."
        }
    },
    "sprints": {
        "get-all": {
            "url": "/sprints",
            "method": "GET",
            "params": {
                "$query": null,
                "$limit": null,
                "$offset": null,
                "$fields": null,
                "$order_by": null,
                "$text_search": null
            },
            "description": "Gets sprints list."
        },
        "get": {
            "url": "/sprints/:id",
            "method": "GET",
            "params": {
                "$id": null,
                "$fields": null
            },
            "description": "Gets a single sprint."
        },
        "create": {
            "url": "/sprints",
            "method": "POST",
            "params": {
                "end_date": {
                    "type": "date",
                    "required": true,
                    "description": "End date"
                },
                "release": {
                    "type": "reference",
                    "required": true,
                    "description": "Release",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                },
                "start_date": {
                    "type": "date",
                    "required": true,
                    "description": "Start date"
                }
            },
            "description": "Create a single sprint."
        },
        "create-bulk": {
            "url": "/sprints",
            "method": "POST",
            "params": {
                "end_date": {
                    "type": "date",
                    "required": true,
                    "description": "End date"
                },
                "release": {
                    "type": "reference",
                    "required": true,
                    "description": "Release",
                    "field_type_data": {
                        "multiple": false,
                        "targets": [
                            {
                                "type": "release"
                            }
                        ]
                    }
                },
                "name": {
                    "type": "string",
                    "required": true,
                    "description": "Name",
                    "max_length": 255
                },
                "start_date": {
                    "type": "date",
                    "required": true,
                    "description": "Start date"
                }
            },
            "description": "Create multiple sprint."
        },
        "update": {
            "url": "/sprints/:id",
            "method": "PUT",
            "params": {
                "end_date": {
                    "type": "date",
                    "required": false,
                    "description": "End date"
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "start_date": {
                    "type": "date",
                    "required": false,
                    "description": "Start date"
                },
                "$id": null
            },
            "description": "Update a single sprint."
        },
        "update-bulk": {
            "url": "/sprints",
            "method": "PUT",
            "params": {
                "end_date": {
                    "type": "date",
                    "required": false,
                    "description": "End date"
                },
                "name": {
                    "type": "string",
                    "required": false,
                    "description": "Name",
                    "max_length": 255
                },
                "start_date": {
                    "type": "date",
                    "required": false,
                    "description": "Start date"
                },
                "$id": null
            },
            "description": "Update multiple sprint."
        },
        "delete": {
            "url": "/sprints/:id",
            "method": "DELETE",
            "params": {
                "$id": null
            },
            "description": "Delete a single sprint."
        }
    }
};

module.exports = config;