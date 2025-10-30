"use client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/admin/creator/ui/avatar";
import { Badge } from "@/components/admin/creator/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/admin/creator/ui/table";
import { findBrands } from "@/services";
import { IProfileUser } from "@/types/profile/profile.type";
import React, { useEffect, useState } from "react";

const Brands = () => {
    const [brands, setBrands] = useState<IProfileUser[]>([]);
    useEffect(() => {
        (async () => {
            const data = await findBrands();
            console.log("brands from admin", data);
            setBrands(data);
        })();
    }, []);

    return (
        <div className="w-full">
            <div className="rounded-xl border border-border bg-[#f0f5ff] dark:bg-[#111C44] shadow-(--shadow-soft) overflow-hidden">
                {brands && brands.length ? (
                    <Table>
                        <TableHeader>
                            <TableRow className="border-border hover:bg-transparent">
                                <TableHead className="w-[300px] text-foreground font-semibold">
                                    User
                                </TableHead>
                                <TableHead className="text-foreground font-semibold">
                                    Email
                                </TableHead>
                                <TableHead className="text-foreground font-semibold">
                                    Role
                                </TableHead>
                                <TableHead className="text-foreground font-semibold">
                                    Categories
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {brands?.map((user, index) => (
                                <TableRow
                                    key={index}
                                    className="border-border transition-all duration-300 hover:bg-accent/30"
                                >
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10 border-2 border-border">
                                                <AvatarImage
                                                    src={`/api/image-proxy?url=${encodeURIComponent(
                                                        user.profile
                                                    )}`}
                                                    alt={user.username}
                                                />
                                                <AvatarFallback className="bg-secondary text-secondary-foreground">
                                                    {user.username.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-foreground font-medium">
                                                {user.username}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-foreground font-medium">
                                            {user.email}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                user.role === "creator"
                                                    ? "default"
                                                    : "secondary"
                                            }
                                            className={
                                                user.role === "creator"
                                                    ? "bg-[hsl(var(--creator-badge))] text-white hover:bg-[hsl(var(--creator-badge))] capitalize"
                                                    : "bg-[hsl(var(--brand-badge))] text-white hover:bg-[hsl(var(--brand-badge))] capitalize"
                                            }
                                        >
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-2">
                                            {user.categories.map(
                                                (category, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant="outline"
                                                        className="bg-[hsl(var(--category-bg))] text-[hsl(var(--category-text))] border-border capitalize"
                                                    >
                                                        {category}
                                                    </Badge>
                                                )
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <span className="text-center">No Brands found!</span>
                )}
            </div>
        </div>
    );
};

export default Brands;
