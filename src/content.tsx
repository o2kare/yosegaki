import * as React from 'react'
import '@freee_jp/vibes/css'
import {
    Container, FinishTaskIllust, Text,
    ListCard, Loading, TaskDialog, Paragraph, VibesProvider, ContentsBase
} from '@freee_jp/vibes'
import {ReactNode, useEffect} from "react"
import {useLocation} from "react-router-dom"

type Content = {
    name: string;
    message: string;
}

export default function App() {
    const [contents, setContents] = React.useState<Content[]>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [selectedContent, setSelectedContent] = React.useState<Content | null>(null)
    const search = useLocation().search
    const params = new URLSearchParams(search)
    const key = params.get("key")
    const apiUrl = "https://script.googleusercontent.com/macros/echo?user_content_key=" + key
    const who = params.get("who")
    useEffect(() => {
        setIsLoading(true)
        fetch(
            apiUrl,
            {
                method: "GET",
                redirect: "follow",
            }
        ).then(res => {
            return res.json()
        }).then(data => setContents(data.contents)
        ).finally(() => setIsLoading(false))
    }, [apiUrl])
    const cards = contents.map((content) => {
        return (
            <ListCard title={content.name} mb={1} onClick={() => setSelectedContent(content)}>
                {content.message.substring(0, 45) + "..."}
            </ListCard>
        )
    })
    const title = who + " おつかれさまでした!"
    const selectedMessage = (selectedContent?.message || "").split("\n").map((str) =>
        (
            <Paragraph>{str}</Paragraph>
        )
    ).reduce<ReactNode[]>((prev, curr) => {
        return [...prev, curr]
    }, [])
    return (
        <VibesProvider fixedLayout={false}>
            <Container width="narrow">
                <Text size={1.5}>{title}</Text>
                <FinishTaskIllust/>
                <Loading isLoading={isLoading}>
                    <ContentsBase>
                        {cards}
                    </ContentsBase>
                </Loading>
                <TaskDialog
                    title={selectedContent?.name + "からのメッセージ"} isOpen={!!selectedContent}
                    closeButtonLabel="close"
                    onRequestClose={() => setSelectedContent(null)}
                >
                    {selectedMessage}
                </TaskDialog>
            </Container>
        </VibesProvider>
    )
}
