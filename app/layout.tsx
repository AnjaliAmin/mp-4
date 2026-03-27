import React from "react";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: {
        template: '%s | CS-391',
        default: 'Home | CS-391',
    },
    description: 'CS391 Icon Finder',
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode;}>) {
    return (
        <html lang="en">
        <body>
        {children}
        </body>
        </html>
    );
}