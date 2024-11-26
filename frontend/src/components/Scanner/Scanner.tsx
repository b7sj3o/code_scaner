import React, {useEffect, useState} from 'react';


// import { BarcodeScanner } from 'react-barcode-scanner';
// import "react-barcode-scanner/polyfill"
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { findProductByBarcode } from '../../services/api';
import { BarcodeProduct } from '../../types/product';
import { error } from 'console';

const Scanner: React.FC = () => {
    const [barcode, setBarcode] = useState<string>("");

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const fetchedProduct = await findProductByBarcode("312512312");
            
    //     }
    // }, [])

    // TODO: change <any>
    const handleUpdate = async (err: any, result: any) => {
        if (result && typeof result.getText === "function") {
            setBarcode(result.getText());


            const fetchedProduct = await findProductByBarcode(result.getText());

            if (fetchedProduct.success) {
                const product = fetchedProduct.data as BarcodeProduct;
                // TODO: Modal instead of alert
                alert([product.name, product.amount, product.producer])
            } else {
                // TODO: Modal instead of alert
                alert(fetchedProduct.data.toString())
            }
        }
    };


    return (
        <>
          <BarcodeScannerComponent
            width={"100%"}
            height={"100%"}
            onUpdate={handleUpdate}
          />
        </>

        
    );
}

export default Scanner;