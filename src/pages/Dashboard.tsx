import {
  Box,
  Button,
  Center,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import "./Dashboard.css";
import { Form, Formik, FormikHelpers } from "formik";
import axios, { AxiosError } from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSigninCheck, useUser } from "reactfire";
import { date, mixed, object, string } from "yup";
import { DatePickerFormControl } from "../components/form/DatePickerFormControl";
import { InputFormControl } from "../components/form/InputFormControl";
import { usePageHeight } from "../helpers/hooks";
import { Link } from "react-router-dom";
import dumpsterFireLogo from "../images/dumpsterfire.png";
import {
  Home,
  Edit,
  Photo,
  ListAlt,
  Message,
  ShoppingBag,
  Group,
  Settings,
  Build,
} from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";

const createIssueFormSchema = object({
  title: string().min(3).required(),
  description: string().min(10).required(),
  assignee: string().min(3).required(),
  reporter: string().min(3).required(),
  priority: mixed().oneOf(["LOW", "MEDIUM", "HIGH"]).default("LOW"),
  status: mixed().oneOf(["TO DO", "IN PROGRESS", "DONE"]).default("TO DO"),
  due: date().required(),
});

export type CreateIssueFormValues = {
  title: string;
  description: string;
  assignee: string;
  reporter: string;
  priority: string;
  status: string;
  due: Date;
};

const tabs = [
  { title: "Dashboard", Icon: Home, path: "Dashboard" },
  { title: "Backing", Icon: Edit, path: "Backing" },
  { title: "Kanbon Board", Icon: Photo, path: "Kanbon" },
  { title: "Reports", Icon: ListAlt, path: "Reports" },
  { title: "Issues Log", Icon: Message, path: "Issues" },
  { title: "RoadMap", Icon: DashboardIcon, path: "Road" },
  { title: "Active Sprints", Icon: ShoppingBag, path: "Active" },
  { title: "Project Settings", Icon: Group, path: "Project" },
  { title: "User Setting", Icon: Settings, path: "User" },
  { title: "Tools", Icon: Build, path: "Tools" },
];

export const Dashboard = () => {
  const pageHeight = usePageHeight();
  const navigate = useNavigate();
  const toast = useToast();
  const { status, data: signInCheckResult } = useSigninCheck();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const createIssueFormInitialValues: CreateIssueFormValues = {
    title: "",
    description: "",
    assignee: "",
    reporter: "",
    priority: "LOW",
    status: "TO DO",
    due: new Date(),
  };

  useEffect(() => {
    if (status == "success") {
      if (!signInCheckResult.signedIn) {
        toast({
          title: "Cannot Access Dashboard",
          description: "User is not Authenticated",
          status: "error",
          duration: 3500,
        });
        navigate("/login");
      }
    }
  }, [signInCheckResult, status]);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:8000/api/issues");
    console.log(res.data["queryResult"]);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const submitCreateIssueForm = (
    values: CreateIssueFormValues,
    {}: FormikHelpers<CreateIssueFormValues>
  ) => {
    const data = {
      ...values,
      // Needed to get date into a yy-mm-dd format
      // See: https://stackoverflow.com/questions/35843050/return-dd-mm-yyyy-from-date-object
      due: values.due.toISOString().split("T")[0],
    };

    axios
      .post("http://localhost:8000/api/issues/add", data)
      .then(async (res) => {
        if (res.status == 200) {
          toast({
            title: "Issue Creation Succeeded",
            description: "Issue was created",
            status: "success",
            duration: 3500,
          });
          onClose();
          await fetchData();
        }
      })
      .catch((_err) => {
        const err = _err as AxiosError;

        toast({
          title: "Issue Creation Failed",
          description: err.message,
          status: "error",
          duration: 3500,
        });
      });
  };

  return (
    <>
      <div className="dashboard-container">
        <div className="sidebar">
          <img
            className="dashboard-logo"
            src={dumpsterFireLogo}
            alt="Dumpster Fire Logo"
          />
          {tabs.map(({ title, Icon, path }) => (
            <Link to={path} className="tab-link">
              <Icon />
              <p>{title}</p>
            </Link>
          ))}
        </div>
        <div className="dashboard-body">
          <div className="sub-header">
            <p>Your work</p>
            <p>Projects</p>
            <p>Dashboards</p>
            <p>People</p>
            <button onClick={onOpen}>Create</button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
        blockScrollOnMount={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Issue</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={createIssueFormInitialValues}
              validationSchema={createIssueFormSchema}
              onSubmit={submitCreateIssueForm}
            >
              {({ errors, touched }) => (
                <Form style={{ width: "100%" }}>
                  <VStack spacing="4" w="full">
                    <InputFormControl
                      isRequired
                      label="Issue Title"
                      name="title"
                      type="text"
                      errors={errors.title}
                      touched={touched.title}
                    />

                    <InputFormControl
                      isRequired
                      label="Issue Assignee"
                      name="assignee"
                      type="text"
                      errors={errors.assignee}
                      touched={touched.assignee}
                    />

                    <InputFormControl
                      isRequired
                      label="Issue Reporter"
                      name="reporter"
                      type="text"
                      errors={errors.reporter}
                      touched={touched.reporter}
                    />

                    <InputFormControl
                      isRequired
                      label="Issue Status"
                      name="status"
                      type="text"
                      errors={errors.status}
                      touched={touched.status}
                    />

                    <InputFormControl
                      isRequired
                      label="Priority"
                      name="priority"
                      type="text"
                      errors={errors.priority}
                      touched={touched.priority}
                    />

                    <DatePickerFormControl name="due" label="Date Due" />

                    <InputFormControl
                      isRequired
                      label="Description"
                      name="description"
                      errors={errors.description}
                      touched={touched.description}
                      h="185px"
                      textArea={{ resize: "none" }}
                    />
                  </VStack>
                  <HStack w="full" mt="4" justifyContent="flex-end">
                    <Button onClick={onClose}>Close</Button>
                    <Button type="submit" variant="ghost" colorScheme="purple">
                      Create
                    </Button>
                  </HStack>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
