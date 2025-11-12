import Earning from "@/components/profile/Earning";
import PersonalDetails from "@/components/profile/PersonalDetails";
import { findUser } from "@/services";
import { IProfile, IProfileUser } from "@/types/profile/profile.type";
import { notFound } from "next/navigation";
import { TbLogout } from "react-icons/tb";

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
            <section className="flex justify-center my-8"><div className="flex gap-1 items-center md:hidden text-red-400 bg-gray-100 dark:bg-black rounded-2xl px-4 pt-1.5 py-2"><TbLogout size={18} /><p>Logout</p></div></section>
        </main>
    );
}
