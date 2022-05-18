package com.example.firsttest;

import android.content.Intent;
import android.os.Bundle;
import android.widget.LinearLayout;

import androidx.appcompat.app.AppCompatActivity;

public class Main extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        LinearLayout btn1 = findViewById(R.id.btn1);
        btn1.setOnClickListener((v)->{
            Intent intent = new Intent(Main.this,Account.class);
            startActivity(intent);
        });

        LinearLayout btn2 = findViewById(R.id.btn2);
        btn2.setOnClickListener((v)->{
            Intent intent = new Intent(Main.this,Gallery.class);
            startActivity(intent);
        });
    }
}