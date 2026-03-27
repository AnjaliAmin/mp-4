import styled from "styled-components";
import { Icon } from "@/types/icon";
import Image from "next/image";

const IconWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    border: 2px solid black;
    padding: 2%;
    text-decoration: none;
    font-family: 'Comic Sans MS', 'Brush Script MT', cursive;
    font-size: calc(3px + 1.5vw);
    color: black;
`;

export default function IconPreview(props:Icon) {
    return (
        <IconWrapper className="icon">
            <Image src={props.preview_url} alt={props.name} width={50} height={50}/>
            <h4>{props.id}</h4>
            <h3>{props.name}</h3>
            <h4>{props.preview_url}</h4>
            <h4>{props.author_name}</h4>
        </IconWrapper>
    );
}
