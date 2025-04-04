import { useRouter} from "next/navigation";

export default function ReviewSelect() {
    const router = useRouter();

    router.push(`/selectset?`);

    return (
        <div></div>
    );
}