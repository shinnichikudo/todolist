package com.example.demo.DTO;

public class AuthRespond {
    private String accessToken;

    private  String tokenType = "Bearer";
    // constructor
    public AuthRespond(String accessToken) {
        this.accessToken = accessToken;
    }
    String getAccessToken() {
        return accessToken;
    }
    String getTokenType() {
        return tokenType;
    }
    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }


}
