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
    InputGroup,
    Heading,
} from '@chakra-ui/react';

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
    ImHammer,
} from 'react-icons/im';
import { HiChevronDown, HiMenu, HiSearch } from 'react-icons/hi';
import React from 'react';
import { useAuth, useSigninCheck, useUser } from 'reactfire';
import { Link as RouterLink, Router } from 'react-router-dom';
import { signOut } from 'firebase/auth';

import dumpsterFireLogo from '../../images/dumpsterfire.png';
import './Header.css';
export const LandingNav = () => {
    const { status, data: signInCheckResult } = useSigninCheck();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { data: user } = useUser();
    const auth = useAuth();

    const renderTopRightButton = () => {
        if (status == 'success' && signInCheckResult.signedIn) {
            return (
                <Menu>
                    <MenuButton as={Button} rightIcon={<HiChevronDown />}>
                        {user?.displayName}
                    </MenuButton>
                    <MenuList>
                        <MenuItem>
                            <Link
                                as={RouterLink}
                                to='/dashboard'
                                _hover={{ textDecoration: 'none' }}
                            >
                                Dashboard
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link
                                as={RouterLink}
                                to='/project-settings'
                                _hover={{ textDecoration: 'none' }}
                            >
                                Project Settings
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={async () => await signOut(auth)}>
                            Logout
                        </MenuItem>
                    </MenuList>
                </Menu>
            );
        } else if (status == 'loading') {
            return (
                <Center w='100px'>
                    <Spinner />
                </Center>
            );
        }
        return (
            <Link as={RouterLink} to='/login'>
                <Button colorScheme='purple'>Login/Signup</Button>
            </Link>
        );
    };

    return (
        <>
            <header id='header'>
                <div className='container'>
                    <div className='nav-area'>
                        <ul className='nav'>
                            <li>
                                <Button onClick={onOpen}>
                                    <HiMenu size={24} />
                                </Button>
                            </li>
                            <li>
                                <Link as={RouterLink} to='/'>
                                    <div className='logo'>
                                        <img
                                            src={dumpsterFireLogo}
                                            alt='Dumpster Fire Logo'
                                        />
                                    </div>
                                </Link>
                            </li>
                        </ul>
                        {renderTopRightButton()}
                    </div>
                </div>
            </header>

            <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent bgColor={'#702963'}>
                    <DrawerCloseButton />
                    <DrawerHeader></DrawerHeader>

                    <DrawerBody>
                        <ul id='SideNav'>
                            <li>
                                <Link as={RouterLink} to='/dashboard'>
                                    <Button onClick={onClose} variant='ghost'>
                                        <ImHome size={30} />
                                        <Text>Dashboard </Text>
                                    </Button>
                                </Link>
                            </li>

                            <li>
                                <Link as={RouterLink} to='/dashboard'>
                                    <Button onClick={onClose} variant='ghost'>
                                        <ImDrawer size={30} />
                                        <Text> Backlog</Text>
                                    </Button>
                                </Link>
                            </li>

                            <li>
                                <Link as={RouterLink} to='/board'>
                                    <Button onClick={onClose} variant='ghost'>
                                        <ImImage size={30} />
                                        <Text> Kanban Board</Text>
                                    </Button>
                                </Link>
                            </li>

                            <li>
                                <Link as={RouterLink} to='/reports'>
                                    <Button onClick={onClose} variant='ghost'>
                                        <ImFileText size={30} />
                                        <Text> Reports </Text>
                                    </Button>
                                </Link>
                            </li>

                            <li>
                                <Link as={RouterLink} to='/dashboard'>
                                    <Button onClick={onClose} variant='ghost'>
                                        <ImBubble size={30} />
                                        <Text> Issue Log</Text>
                                    </Button>
                                </Link>
                            </li>

                            <li>
                                <Link as={RouterLink} to='/dashboard'>
                                    <Button onClick={onClose} variant='ghost'>
                                        <ImStatsDots size={30} />
                                        <Text> Roadmap </Text>
                                    </Button>
                                </Link>
                            </li>

                            <li>
                                <Link as={RouterLink} to='/dashboard'>
                                    <Button onClick={onClose} variant='ghost'>
                                        <ImClipboard size={30} />
                                        <Text>Active Sprint </Text>
                                    </Button>
                                </Link>
                            </li>

                            <li>
                                <Link as={RouterLink} to='/project-settings'>
                                    <Button onClick={onClose} variant='ghost'>
                                        <ImUsers size={30} />
                                        <Text>Project Settings </Text>
                                    </Button>
                                </Link>
                            </li>

                            <li>
                                <Link as={RouterLink} to='/dashboard'>
                                    <Button onClick={onClose} variant='ghost'>
                                        <ImUser size={30} />
                                        <Text> User Setting </Text>
                                    </Button>
                                </Link>
                            </li>

                            <li>
                                <Link as={RouterLink} to='/dashboard'>
                                    <Button onClick={onClose} variant='ghost'>
                                        <ImHammer size={30} />
                                        <Text> Tools </Text>
                                    </Button>
                                </Link>
                            </li>
                        </ul>
                    </DrawerBody>
                    <DrawerFooter>
                        {user?.displayName}
                        <Button onClick={async () => await signOut(auth)}>
                            Sign Out
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};
