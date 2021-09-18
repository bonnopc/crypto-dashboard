import Container from "modules/common/components/Container"
import { useSelector, useDispatch } from "react-redux"

export default function Dashboard(){
    const topCurrencies = useSelector(state => state.dashboard.currencies)
    const dispatch = useDispatch()

    return (
        <Container>
            <h2>Dashboard</h2>
        </Container>
    )
}