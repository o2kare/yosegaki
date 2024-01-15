import * as React from 'react'
import '@freee_jp/vibes/css'
import {
    Container, FinishTaskIllust, Text,
    ListCard, Loading, TaskDialog, Paragraph, VibesProvider, ContentsBase
} from '@freee_jp/vibes'
import {useEffect} from "react"

type Content = {
    name: string;
    message: string;
}

export default function App() {
    const [contents, setContents] = React.useState<Content[]>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [selectedContent, setSelectedContent] = React.useState<Content | null>(null)
    useEffect(() => {
        setIsLoading(true)
        fetch(
            process.env.REACT_APP_API_URL || "",
            {
                method: "GET",
                redirect: "follow",
            }
        ).then(res => {
            return res.json()
        }).then(data => setContents(data.contents)
        ).finally(() => setIsLoading(false))
    }, [])
    const cards = contents.map((content) => {
        return (
            <ListCard title={content.name} mb={1} onClick={() => setSelectedContent(content)}>
                {content.message.substring(0, 45) + "..."}
            </ListCard>
        )
    })
    const title = process.env.REACT_APP_TITLE || "おつかれ!"
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
                    title={selectedContent?.name} isOpen={!!selectedContent} closeButtonLabel="close"
                    onRequestClose={() => setSelectedContent(null)}
                >
                    <Paragraph>{selectedContent?.message}</Paragraph>
                </TaskDialog>
            </Container>
        </VibesProvider>
    )
}
