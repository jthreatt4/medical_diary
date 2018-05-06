new_schedule_payload = {
    "Meta": {
        "DataModel": "Scheduling",
        "EventType": "New",
        "EventDateTime": "2018-05-03T22:43:15.656Z",
        "Source": {
            "ID": "7ce6f387-c33c-417d-8682-81e83628cbd9",
            "Name": "Redox Dev Tools"
        },
        "Destinations": [
            {
                "ID": "af394f14-b34a-464f-8d24-895f370af4c9",
                "Name": "Redox EMR"
            }
        ],
        "Message": {
            "ID": 5565
        },
        "Transmission": {
            "ID": 12414
        },
        "FacilityCode": None
    },
    "Patient": {
        "Identifiers": [
            {
                "ID": "0000000001",
                "IDType": "MR"
            },
            {
                "ID": "e167267c-16c9-4fe3-96ae-9cff5703e90a",
                "IDType": "EHRID"
            },
            {
                "ID": "a1d4ee8aba494ca",
                "IDType": "NIST"
            }
        ],
        "Demographics": {
            "FirstName": "Timothy",
            "MiddleName": "Paul",
            "LastName": "Bixby",
            "DOB": "2008-01-06",
            "SSN": "101-01-0001",
            "Sex": "Male",
            "Race": "Asian",
            "IsHispanic": None,
            "MaritalStatus": "Single",
            "IsDeceased": None,
            "DeathDateTime": None,
            "PhoneNumber": {
                "Home": "+18088675301",
                "Office": None,
                "Mobile": None
            },
            "EmailAddresses": [],
            "Language": "en",
            "Citizenship": [],
            "Address": {
                "StreetAddress": "4762 Hickory Street",
                "City": "Monroe",
                "State": "WI",
                "ZIP": "53566",
                "County": "Green",
                "Country": "US"
            }
        },
        "Notes": []
    },
    "AppointmentInfo": [
        {
            "Code": "23457",
            "Codeset": "Redox EHR Codes",
            "Description": "Priority",
            "Value": "Normal"
        },
        {
            "Code": "23457",
            "Codeset": "Redox EHR Codes",
            "Description": "Form",
            "Value": "Lumbar"
        }
    ],
    "Visit": {
        "VisitNumber": "1234",
        "AccountNumber": None,
        "VisitDateTime": "2018-05-03T22:43:16.838Z",
        "PatientClass": None,
        "Status": None,
        "Duration": 15,
        "Reason": "Check up",
        "Instructions": [],
        "AttendingProvider": {
            "ID": "4356789876",
            "IDType": "NPI",
            "FirstName": "Pat",
            "LastName": "Granite",
            "Credentials": [
                "MD"
            ],
            "Address": {
                "StreetAddress": "123 Main St.",
                "City": "Madison",
                "State": "WI",
                "ZIP": "53703",
                "County": "Dane",
                "Country": "USA"
            },
            "Location": {
                "Type": None,
                "Facility": None,
                "Department": None,
                "Room": None
            },
            "PhoneNumber": {
                "Office": "+16085551234"
            }
        },
        "ConsultingProvider": {
            "ID": None,
            "IDType": None,
            "FirstName": None,
            "LastName": None,
            "Credentials": [],
            "Address": {
                "StreetAddress": None,
                "City": None,
                "State": None,
                "ZIP": None,
                "County": None,
                "Country": None
            },
            "Location": {
                "Type": None,
                "Facility": None,
                "Department": None,
                "Room": None
            },
            "PhoneNumber": {
                "Office": None
            }
        },
        "ReferringProvider": {
            "ID": None,
            "IDType": None,
            "FirstName": None,
            "LastName": None,
            "Credentials": [],
            "Address": {
                "StreetAddress": None,
                "City": None,
                "State": None,
                "ZIP": None,
                "County": None,
                "Country": None
            },
            "Location": {
                "Type": None,
                "Facility": None,
                "Department": None,
                "Room": None
            },
            "PhoneNumber": {
                "Office": None
            }
        },
        "VisitProvider": {
            "ID": None,
            "IDType": None,
            "FirstName": None,
            "LastName": None,
            "Credentials": [],
            "Address": {
                "StreetAddress": None,
                "City": None,
                "State": None,
                "ZIP": None,
                "County": None,
                "Country": None
            },
            "Location": {
                "Type": None,
                "Facility": None,
                "Department": None,
                "Room": None
            },
            "PhoneNumber": {
                "Office": None
            }
        },
        "Location": {
            "Type": "Inpatient",
            "Facility": "RES General Hospital",
            "Department": "3N",
            "Room": "136"
        },
        "Diagnoses": [
            {
                "Code": "R07.0",
                "Codeset": "ICD-10",
                "Name": "Pain in throat",
                "Type": None
            }
        ]
    }
}

available_slots_payload = {
    "Meta": {
        "DataModel": "Scheduling",
        "EventType": "AvailableSlots",
        "EventDateTime": "2018-05-04T06:12:38.005Z",
        "Test": True,
        "Destinations": [
            {
                "ID": "af394f14-b34a-464f-8d24-895f370af4c9",
                "Name": "Redox EMR"
            }
        ],
        "FacilityCode": None
    },
    "Patient": {
        "Identifiers": [
            {
                "ID": "0000000001",
                "IDType": "MR"
            },
            {
                "ID": "e167267c-16c9-4fe3-96ae-9cff5703e90a",
                "IDType": "EHRID"
            },
            {
                "ID": "a1d4ee8aba494ca",
                "IDType": "NIST"
            }
        ]
    },
    "StartDateTime": "2018-05-06T05:56:40.305Z",
    "EndDateTime": None,
    # "Visit": {
    #     "Reasons": [],
    #     "AttendingProviders": [],
    #     "Locations": []
    # }
}

booked = {
    "Meta": {
        "DataModel": "Scheduling",
        "EventType": "Booked",
        "EventDateTime": "2018-05-04T06:12:32.157Z",
        "Test": True,
        "Destinations": [
            {
                "ID": "af394f14-b34a-464f-8d24-895f370af4c9",
                "Name": "Redox EMR"
            }
        ],
        "FacilityCode": None
    },
    "StartDateTime": "2018-05-06T06:37:30.441Z",
    "EndDateTime": None,
    "Visit": {
        "Reason": None,
        "AttendingProviders": [
            {
                "ID": "4356789876",
                "IDType": "NPI",
                "FirstName": "Pat",
                "LastName": "Granite",
                "Credentials": [
                    "MD"
                ],
                "Address": {
                    "StreetAddress": "123 Main St.",
                    "City": "Madison",
                    "State": "WI",
                    "ZIP": "53703",
                    "County": "Dane",
                    "Country": "USA"
                },
                "Location": {
                    "Type": None,
                    "Facility": None,
                    "Department": None,
                    "Room": None
                },
                "PhoneNumber": {
                    "Office": "+16085551234"
                }
            }
        ],
        "VisitProvider": {
            "ID": None,
            "IDType": None,
            "FirstName": None,
            "LastName": None,
            "Credentials": [],
            "Address": {
                "StreetAddress": None,
                "City": None,
                "State": None,
                "ZIP": None,
                "County": None,
                "Country": None
            },
            "Location": {
                "Type": None,
                "Facility": None,
                "Department": None,
                "Room": None
            },
            "PhoneNumber": {
                "Office": None
            }
        },
        "Location": {
            "Type": None,
            "Facility": None,
            "Department": None,
            "Room": None
        },
        "Patients": [
            {
                "Identifiers": [
                    {
                        "ID": "0000000001",
                        "IDType": "MR"
                    },
                    {
                        "ID": "e167267c-16c9-4fe3-96ae-9cff5703e90a",
                        "IDType": "EHRID"
                    },
                    {
                        "ID": "a1d4ee8aba494ca",
                        "IDType": "NIST"
                    }
                ]
            }
        ]
    }
}
