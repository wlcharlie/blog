import Link from "next/link"
import { Flex, chakra } from "@chakra-ui/react"

const Blocker = chakra("div", {
  baseStyle: {
    position: "relative",
    width: "25%",
    left: 0,
    display: ["none", null, "flex"],
  },
})

const Nav = chakra(Flex, {
  baseStyle: {
    position: ["sticky", null, "fixed"],
    top: 0,
    left: 0,
    width: ["100vw", null, "25%"],
    height: ["50px", null, "100vh"],
    backgroundColor: "orange.cat",
    flexDirection: ["row", null, "column"],
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
})

const NavItem = chakra(Flex, {})

const NavLink = ({ href, title }) => {
  return (
    <NavItem>
      <Link href={href}>
        <a>{title}</a>
      </Link>
    </NavItem>
  )
}

export default function NavBar() {
  return (
    <>
      <Blocker />
      <Nav>
        <NavLink href="/" title="Home" />
        <NavLink href="/" title="Notes" />
        <NavLink href="/pancake" title="Pancake" />
        <NavLink href="/about-me" title="About Me" />
      </Nav>
    </>
  )
}
