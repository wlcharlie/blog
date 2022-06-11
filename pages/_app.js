import "../styles/globals.css"
import { Flex, ChakraProvider, extendTheme, chakra } from "@chakra-ui/react"
import NavBar from "components/Nav"

const colors = {
  orange: {
    cat: "#d09462",
  },
  black: {
    cat: "#2a2b26",
  },
}

const theme = extendTheme({ colors })

const FullPageContainer = chakra(Flex, {
  baseStyle: {
    backgroundColor: "white",
    width: "100vw",
    maxHeight: "100vh",
    position: "relative",
    flexDirection: ["column", null, "flex"],
  },
})

const ContentContainer = chakra("div", {
  baseStyle: {
    margin: "0 auto",
  },
})

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <FullPageContainer>
        <NavBar />
        <ContentContainer>
          <Component {...pageProps} />
        </ContentContainer>
      </FullPageContainer>
    </ChakraProvider>
  )
}

export default MyApp
