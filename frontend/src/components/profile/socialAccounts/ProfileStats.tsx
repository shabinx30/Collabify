export const ProfileStat = ({
    label,
    value,
}: {
    label: string;
    value: string | number;
}) => (
    <div className="block">
        <p className="font-semibold">{value}</p>
        <p className="text-[#A8A8A8]">{label}</p>
    </div>
);