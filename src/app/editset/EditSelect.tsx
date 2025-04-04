import { useRouter} from "next/navigation";

export default function EditSelect() {
    const router = useRouter();

    router.push(`/selectset?`);

    return (
        <div></div>
    );
}