
interface Props {
    show: boolean
}

export default function Loader({ show }: Props) {
    return show ? <div className="border-8 border-t-8 rounded-xl animate-bounce"></div> : null;
}