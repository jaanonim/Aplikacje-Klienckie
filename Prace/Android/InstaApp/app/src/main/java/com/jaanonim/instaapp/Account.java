package com.jaanonim.instaapp;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.GridView;
import android.widget.ImageView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

public class Account extends AppScreen {

    String[] array = new String[]{"a", "b", "c"};

    ImageView profileImg;

    @Override
    protected int getView() {
        return R.layout.activity_account;
    }

    public void updateImg() {
        if (LocalDb.profileImage != null) {
            profileImg.setImageBitmap(LocalDb.profileImage);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        updateImg();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        GridView gridView = findViewById(R.id.grid1);
        ArrayAdapter<String> adapter = new ArrayAdapter<>(
                Account.this,
                R.layout.account_img,
                R.id.textView2,
                array);

        gridView.setAdapter(adapter);

        profileImg = findViewById(R.id.profileAccount);


        Button bt = findViewById(R.id.button2);
        bt.setOnClickListener((v) -> {
            Intent intent = new Intent(Account.this, Edit.class);
            startActivity(intent);
        });

        gridView.setOnItemClickListener((a, v, i, l) -> {
            Intent intent = new Intent(Account.this, Photo.class);
            intent.putExtra("photo", array[i]);
            startActivity(intent);

        });

    }

}