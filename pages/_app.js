import '../styles/globals.css'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import theme from '@chakra-ui/theme'
import "antd/dist/antd.css"//全局引用antd的样式

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
