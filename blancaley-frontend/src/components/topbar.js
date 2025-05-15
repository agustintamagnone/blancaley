"use client";

import Link from "next/link";
import { AiFillInstagram, AiFillLinkedin, AiFillTwitterSquare } from "react-icons/ai";

export default function Topbar() {
    return (
        <div className="bg-orange-500 flex justify-between items-center px-6 lg:px-20 py-1">
            <div className="flex justify-start items-center">
                <div className="flex gap-4">
                    <Link
                        href="#"
                        className="text-white hover:text-gray-200 transition ease-in-out duration-500"
                        prefetch={false}>
                        <AiFillInstagram className="h-6 w-6"/>
                    </Link>
                    <Link
                        href="#"
                        className="text-white hover:text-gray-200 transition ease-in-out duration-500"
                        prefetch={false}>
                        <AiFillTwitterSquare className="h-6 w-6"/>
                    </Link>
                </div>
            </div>
        </div>
    );
}