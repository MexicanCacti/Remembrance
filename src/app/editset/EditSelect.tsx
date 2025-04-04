import { useRouter} from "next/navigation";
import {useEffect} from "react";

export default function EditSelect() {
    const router = useRouter();

    useEffect(() => {
        router.push(`/selectset?`);
    }, []);

    return (
        <div></div>
    );
}