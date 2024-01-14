import * as React from 'react'
import '@freee_jp/vibes/css'
import {Container, FinishTaskIllust, Text, ListCard, Loading} from '@freee_jp/vibes'
import {useEffect} from "react"

type Content = {
    name: string;
    message: string;
}

export default function App() {
    const [contents, setContents] = React.useState<Content[]>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    useEffect(() => {
        setIsLoading(true)
        fetch(
            "https://script.google.com/macros/s/AKfycbxcjcvwV86nEPk-D54KP27cKnm3KLhSIY0YGi2sY8UQy6po0EUTlcKxOH6usQQjiqR0/exec",
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
            <ListCard title={content.name} mb={1}>
                {content.message}
            </ListCard>
        )
    })
    return (
        <Container width="narrow">
            <Text size={1.5}>おつかれ！！！</Text>
            <FinishTaskIllust/>
            <Loading isLoading={isLoading}>
                {cards}
            </Loading>
        </Container>
    )
}