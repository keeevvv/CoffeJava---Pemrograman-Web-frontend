import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import the useLocation hook
import { usePage } from "@inertiajs/react";
import { Avatar, Dropdown, Navbar, Button } from "flowbite-react";
import { Link } from "@inertiajs/react";
import Logo from "../assets/images/logo.png";
import { router } from '@inertiajs/react';
import { Inertia } from "@inertiajs/inertia";

export default function NavbarComponent() {
    const { isLoggedIn, user } = usePage().props;

    useEffect(() => {
        console.log();
    }, []);
    return (
        <Navbar
            fluid
            rounded
            className="bg-NusantaraGold fixed z-10 w-full top-0"
        >
            <Navbar.Brand href="/">
                <div className=" w-10">
                    <img src={Logo} sizes className="w-full" alt="Logo" />
                </div>

                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    E-Nusantara
                </span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                {isLoggedIn.isLoggedIn == true ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt="User settings"
                                img={
                                    user.profileImage == null
                                        ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                                        : user.profileImage
                                }
                                rounded
                            />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">{user.name}</span>
                            <span className="block truncate text-sm font-medium">
                                {user.email}
                            </span>
                        </Dropdown.Header>
                        <Link href="/profile">
                            <Dropdown.Item>Profile</Dropdown.Item>
                        </Link>
                        <Link href="/profile/setting">
                            <Dropdown.Item>Settings</Dropdown.Item>
                        </Link>
                        <Link href="/profile/orders">
                            <Dropdown.Item>Orders</Dropdown.Item>
                        </Link>

                        <Dropdown.Divider />
                        <Dropdown.Item
                            onClick={() => {
                                Inertia.delete("/profile/signout")
                            }}
                        >
                            Sign out
                        </Dropdown.Item>
                    </Dropdown>
                ) : (
                    <Link href="/login">
                        <Button>Login</Button>
                    </Link>
                )}
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link
                    href="/"
                    className={`${
                        location.pathname === "/"
                            ? "text-gray-600"
                            : "text-black"
                    }`}
                >
                    Home
                </Navbar.Link>
                <Navbar.Link
                    href="/shop"
                    className={`${
                        location.pathname === "/shop"
                            ? "text-gray-600"
                            : "text-black"
                    }`}
                >
                    Shop
                </Navbar.Link>
                <Navbar.Link
                    href="/bag"
                    className={`${
                        location.pathname === "/bag"
                            ? "text-gray-600"
                            : "text-black"
                    }`}
                >
                    Bag
                </Navbar.Link>
                <Navbar.Link
                    href="/favorites"
                    className={`${
                        location.pathname === "/favorites"
                            ? "text-gray-600"
                            : "text-black"
                    }`}
                >
                    Favorite
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}
