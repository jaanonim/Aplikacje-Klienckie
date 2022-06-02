package com.jaanonim.instaapp;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.widget.Button;

public class EditPhoto extends  AppScreen {

    @Override
    protected int getView() {
        return R.layout.activity_edit_photo;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Button btn_edit_tags = findViewById(R.id.edit_tags);
        btn_edit_tags.setOnClickListener((v)->{
            Intent intent = new Intent(this,EditTag.class);
            startActivity(intent);
        });
    }
}