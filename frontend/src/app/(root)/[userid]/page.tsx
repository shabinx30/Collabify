import Earning from "@/components/profile/Earning";
import Logout from "@/components/profile/Logout";
import PersonalDetails from "@/components/profile/PersonalDetails";
import { findUser } from "@/services";
import { IProfile, IProfileUser } from "@/types/profile/profile.type";
import { notFound } from "next/navigation";

export default async function Profile({ params }: IProfile) {
    const userid = (await params).userid;
    const data = (await findUser(userid)) as IProfileUser;

    if (!data) {
        notFound();
    }

    return (
        <main className="flex flex-col md:flex-row flex-1 gap-4 p-2 sm:p-4">
            <PersonalDetails data={data} />
            <Earning />
            <Logout />
        </main>
    );
}
