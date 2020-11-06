const config = {
    STRIPE_KEY: "pk_test_RE8iU25msFs1fTlOXLQo6dOm00FEkRL3jC",
  s3: {
    REGION: "ap-northeast-2",
    BUCKET: "notes-app-2-api-dev-attachmentsbucket-uavndyiopfr9"
  },
  apiGateway: {
    REGION: "ap-northeast-2",
    URL: "https://il74ar0qfl.execute-api.ap-northeast-2.amazonaws.com/dev"
  },
  cognito: {
    REGION: "ap-northeast-2",
    USER_POOL_ID: "ap-northeast-2_o1BPrC5l8",
    APP_CLIENT_ID: "4vpk1uab2alcosb9ttb5pdecf1",
    IDENTITY_POOL_ID: "ap-northeast-2:13b49dab-df9e-4280-9f2a-da4f45115ef4"
  },
    social: {
        FB: "478022039827691"
        
    }
};


export default {
  ...config
};
