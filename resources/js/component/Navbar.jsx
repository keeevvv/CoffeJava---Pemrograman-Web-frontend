import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { Avatar, Dropdown, Navbar, Button } from "flowbite-react";
import { Link } from "@inertiajs/react";
import Logo from "../assets/images/logo.png";

export default function NavbarComponent() {
    const { isLoggedIn } = usePage().props;

    useEffect(() => {
        console.log();
    }, []);
    return (
        <Navbar
            fluid
            rounded
            className="bg-emerald-400 fixed z-10 w-full top-0"
        >
            <Navbar.Brand href="/">
                <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Flowbite React
                </span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                {isLoggedIn.isLoggedIn ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt="User settings"
                                img="https://i.pinimg.com/736x/89/30/f7/8930f79f497e6b09703985ad3e844708.jpg"
                                rounded
                            />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">User Name</span>
                            <span className="block truncate text-sm font-medium">
                                user@example.com
                            </span>
                        </Dropdown.Header>
                        <Dropdown.Item>Dashboard</Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Item>Earnings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>Sign out</Dropdown.Item>
                    </Dropdown>
                ) : (
                    <Link href="/login">
                        <Button>Login</Button>
                    </Link>
                )}
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link href="/" active>
                    Home
                </Navbar.Link>
                <Navbar.Link href="/about">About</Navbar.Link>
                <Navbar.Link href="/services">Services</Navbar.Link>
                <Navbar.Link href="/pricing">Pricing</Navbar.Link>
                <Navbar.Link href="/contact">Contact</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}
