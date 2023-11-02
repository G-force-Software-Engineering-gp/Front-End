import { render , screen } from "@testing-library/react";
import Login from "../Login";



describe("Login", () => {
    test('check if Login UI renders correctly' , () => {
        render(<Login />)
        const headerLoginElement = screen.getByText('heading')
        expect(headerLoginElement).toBeInTheDocument()
    })
})