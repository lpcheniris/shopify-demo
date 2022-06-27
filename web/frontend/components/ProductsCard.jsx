import { useState, useEffect } from "react";
import {
  Card,
  Heading,
  TextContainer,
  DisplayText,
  TextStyle,
} from "@shopify/polaris";
import { Toast } from "@shopify/app-bridge-react";
import { useAppQuery } from "../hooks";

export function ProductsCard() {
  const [showToast, setShowToast] = useState(false);

  const {
    data: productsCount,
    refetch: refetchProductCount,
    isLoading: isLoadingCount,
    isRefetching: isRefetchingCount,
  } = useAppQuery({
    url: "/api/products-count",
    reactQueryOptions: {
      onSuccess: () => {
        // setIsLoading(false);
      },
    },
  });

    const {
      data: newProducts,
      refetch: refetchNewProducts,
      isLoading: isLoadingProducts,
      
     } = useAppQuery({
      enabled:false,
      url: "/api/newproducts",
      reactQueryOptions: {
        onSuccess: (respnse) => {
          refetchProductCount()
          // setIsLoading(false);
        },
      },
    })

    const handleGetNewProducts = () => {
      refetchNewProducts()
    }

  const toastMarkup = showToast && !isRefetchingCount && (
    <Toast
      content="5 products created!"
      onDismiss={() => setShowToast(false)}
    />
  );
  
  return (
    <>
      {toastMarkup}
      <Card
        title="Product Counter"
        sectioned
        primaryFooterAction={{
          content: "Get new products",
          // onAction: handlePopulate,
          onAction: handleGetNewProducts,
          loading: isLoadingProducts,
        }}
      >
        <TextContainer spacing="loose">
          <Heading element="h4">
            TOTAL PRODUCTS
            <DisplayText size="medium">
              <TextStyle variation="strong">
                {isLoadingCount ? "-" : productsCount.count}
              </TextStyle>
            </DisplayText>
          </Heading>
          {JSON.stringify(newProducts)}
        </TextContainer>
      </Card>
    </>
  );
}
