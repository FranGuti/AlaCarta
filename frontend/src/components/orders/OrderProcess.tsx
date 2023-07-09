import ContentPane from "../shared/ContentPane";
import TitleCard from "./TitleCard";

const OrderProcess = () => {

    const orderProcessTitle = "Proceso de Pedidos"

    return (
        <>
            <ContentPane>
                <TitleCard title={orderProcessTitle} />
            </ContentPane>
        </>
    )
};

export default OrderProcess;