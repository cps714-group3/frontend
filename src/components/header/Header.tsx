import {
  Button,
  Center,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useAuth, useSigninCheck, useUser } from "reactfire";
import { Link as RouterLink, Router } from "react-router-dom";
import { signOut } from "firebase/auth";
import { HiChevronDown } from "react-icons/hi";
import dumpsterFireLogo from "../../images/dumpsterfire.png";
import "./Header.css";

export const LandingNav = () => {
  const { status, data: signInCheckResult } = useSigninCheck();
  const { data: user } = useUser();
  const auth = useAuth();

  const renderTopRightButton = () => {
    if (status == "success" && signInCheckResult.signedIn) {
      return (
        <Menu>
          <MenuButton as={Button} rightIcon={<HiChevronDown />}>
            {user?.displayName}
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Link
                as={RouterLink}
                to="/dashboard"
                _hover={{ textDecoration: "none" }}
              >
                Dashboard
              </Link>
            </MenuItem>
            <MenuItem onClick={async () => await signOut(auth)}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      );
    } else if (status == "loading") {
      return (
        <Center w="100px">
          <Spinner />
        </Center>
      );
    }
    return (
      <Link as={RouterLink} to="/login" _hover={{ textDecoration: "none" }}>
        <Button colorScheme="purple">Login/Signup</Button>
      </Link>
    );
  };

  return (
    <header id="header">
      <div className="container">
        <div className="logo">
          <a href="/">
            <img src={dumpsterFireLogo} alt="Dumpster Fire Logo" />
          </a>
        </div>
        <h1 className="active" id="projectTitle">
          Dumpster Fire
        </h1>
        <div className="nav-area">
          <ul className="nav">
            <li>
              <a href="#visual" className="down">
                Home
              </a>
            </li>
            <li>
              <a href="#features" className="down">
                Features
              </a>
            </li>
            <li>
              <a href="#faq" className="down">
                FAQ
              </a>
            </li>
          </ul>
          {renderTopRightButton()}
        </div>
      </div>
    </header>
  );
};
