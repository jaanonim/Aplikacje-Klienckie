package com.jaanonim.instaapp;


import android.os.Bundle;
import android.widget.TextView;

public class Photo extends AppScreen {

    @Override
    protected int getView() {
        return R.layout.activity_photo;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Bundle bundle = getIntent().getExtras();
        String photoName = bundle.getString("photo").toString();
        TextView desc = findViewById(R.id.descriptionImg);
        desc.setText(photoName);
    }
}