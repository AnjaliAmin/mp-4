"use client";

import { useState } from "react";
import IconPreview from "@/app/components/IconPreview";
import { Icon } from "@/app/interfaces/icon";
import styled from "styled-components";

const StyledMain=styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1%;
`;

const StyledDiv=styled.div`
    padding: 1%;
    text-decoration: none;
    text-align: center;
    font-family: Georgia, "Times New Roman", serif;
    color: black;
`;

const StyledHeader=styled.header`
    margin: 5%;
    font-family: 'Comic Sans MS', 'Brush Script MT', cursive;
    font-size: calc(10px + 1.5vw);
`;

const StyledInput=styled.input`
    margin: 5%;
    width: 300px;
    border: 1px solid black;
    border-radius: 5px;
    padding: 2%;
    font-family: 'Comic Sans MS', 'Brush Script MT', cursive;
    font-size: calc(5px + 1.5vw);
`;

const StyledButton=styled.button`
    border: 2px groove black;
    border-radius: 15px;
    background-color: white;
    color: black;
    font-family: 'Comic Sans MS', 'Brush Script MT', cursive;
    font-size: calc(10px + 1.2vw);
    padding: 5%;
    margin: 5%;
`;


export default function Home() {
    const [query, setQuery] = useState("");
    const [icons, setIcons] = useState<Icon[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const searchIcons = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setError("");

        try {
            const res = await fetch(`/api/icons?query=${encodeURIComponent(query)}`);
            if (!res.ok) throw new Error("Failed to fetch");

            const data = await res.json();

            const mapped: Icon[] = data.data.map((item: any) => ({
                id: item.id,
                name: item.name ?? "Untitled",
                preview_url: item.thumbnails?.[0]?.url ?? "",
                author_name: item.author?.name ?? "Unknown",
            }));

            setIcons(mapped);
        } catch (err) {
            setError("Something went wrong. Check your API key or query.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <StyledMain>

            <StyledDiv>

                <StyledHeader>
                    <h1> Icon Search </h1>
                </StyledHeader>

                <StyledInput
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && searchIcons()}
                    placeholder="Search icons..."
                />

                <StyledButton onClick={searchIcons}>
                    Search
                </StyledButton>

            </StyledDiv>

                {icons.map((icon) => (
                    <IconPreview key={icon.id} {...icon} />
                ))}

        </StyledMain>
    );
}