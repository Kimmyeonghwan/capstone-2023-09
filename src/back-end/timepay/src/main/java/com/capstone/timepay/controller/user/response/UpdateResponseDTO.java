package com.capstone.timepay.controller.user.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;

@Data
@JsonNaming(value = PropertyNamingStrategy.SnakeCaseStrategy.class)
public class UpdateResponseDTO {
    private Long uid;
    private String imageUrl;
    private String name;
    private String nickName;
    private String sex;
    // private String age;
    private String location;
    private String introduction;

    public UpdateResponseDTO(Long uid, String imageUrl, String name, String nickName, String sex, String location, String introduction){
        this.uid = uid;
        this.imageUrl = imageUrl;
        this.name = name;
        this.nickName = nickName;
        this.sex = sex;
        this.location = location;
        this.introduction = introduction;
    }

}
