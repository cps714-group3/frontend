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
  Input,
  InputLeftElement,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  InputGroup
} from "@chakra-ui/react";

import {
  ImHome,
  ImDrawer,
  ImImage,
  ImFileText,
  ImBubble,
  ImStatsDots,
  ImClipboard,
  ImUsers,
  ImUser,
  ImHammer
} from 'react-icons/im';
import { HiChevronDown, HiMenu, HiSearch } from "react-icons/hi";
import React from "react";
import { useAuth, useSigninCheck, useUser } from "reactfire";
import { Link as RouterLink, Router } from "react-router-dom";
import { signOut } from "firebase/auth";

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
                User Settings
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

  const RenderTopHeader = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    if (status == "success" && signInCheckResult.signedIn) {
      return (
        <>
          <header id="header2">
            <div className="container">
              <div className="nav-area">
                <ul className="nav">
                  <li>
                    <Button onClick={onOpen}>
                      <HiMenu size={24} />
                    </Button>
                  </li>
                  <li>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents='none'
                        children={<HiSearch color='black' />}
                      />
                      <Input htmlSize={10} maxWidth="500px" minWidth="300" bg="white" color="black" placeholder="Search" _placeholder={{ opacity: 0.5, color: 'black' }} />
                    </InputGroup>
                  </li>
                  <li>
                    Home
                  </li>
                  <li>
                    Projects
                  </li>
                  <li>
                    People
                  </li>
                </ul>
                {renderTopRightButton()}
              </div>
            </div>
          </header>

          <Drawer
            isOpen={isOpen}
            placement='left'
            onClose={onClose}
          >
            <DrawerOverlay />
            <DrawerContent bgColor={"#702963"}>
              <DrawerCloseButton />
              <DrawerHeader></DrawerHeader>

              <DrawerBody>
                <ul id="SideNav">
                  <li>
                    <div className="logo"> <img src={dumpsterFireLogo} alt="Dumpster Fire Logo" /></div>
                  </li>
                  <li><Link as={RouterLink} to='/dashboard'><Button onClick={onClose} variant="ghost"> <ImHome size={30} /><p>Dashboard  </p></Button></Link> </li>

                  <li> <Link as={RouterLink} to='/dashboard'> <Button onClick={onClose} variant="ghost" > <ImDrawer size={30} /><p> Backlog</p> </Button> </Link> </li>

                  <li><Link as={RouterLink} to='/board'> <Button onClick={onClose} variant="ghost" > <ImImage size={30} /><p> Kanban Board</p> </Button></Link>  </li>


                  <li> <Link as={RouterLink} to='/reports'> <Button onClick={onClose} variant="ghost" ><ImFileText size={30} /><p> Reports  </p></Button> </Link> </li>


                  <li> <Link as={RouterLink} to='/dashboard'> <Button onClick={onClose} variant="ghost" > <ImBubble size={30} /><p> Issue Log</p> </Button> </Link> </li>


                  <li><Link as={RouterLink} to='/dashboard'>  <Button onClick={onClose} variant="ghost" > <ImStatsDots size={30} /> <p> Roadmap </p> </Button> </Link></li>


                  <li><Link as={RouterLink} to='/dashboard'>  <Button onClick={onClose} variant="ghost" > <ImClipboard size={30} /><p>Active Sprint </p> </Button> </Link> </li>

                  <li> <Link as={RouterLink} to='/project-settings'> <Button onClick={onClose} variant="ghost" > <ImUsers size={30} /><p>Project Settings  </p></Button></Link>  </li>


                  <li> <Link as={RouterLink} to='/dashboard'><Button onClick={onClose} variant="ghost"><ImUser size={30} /> <p> User Settings </p></Button> </Link> </li>


                  <li>  <Link as={RouterLink} to='/dashboard'> <Button onClick={onClose} variant="ghost"  > <ImHammer size={30} /><p> Tools </p> </Button> </Link> </li>
                </ul>
              </DrawerBody>
              <DrawerFooter> {user?.displayName} <Button onClick={async () => await signOut(auth)}>Sign Out</Button></DrawerFooter>
            </DrawerContent>
          </Drawer>
        </>
      );
    }
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


  return (

    <div>
      {RenderTopHeader()}
    </div>
  );
};
