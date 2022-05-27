package com.example.firsttest;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.GridView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

public class Account extends AppCompatActivity {

    String[] array = new String[]{"a","b","c"};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_account);

        ActionBar actionBar =  getSupportActionBar();
        if (actionBar != null) {
            actionBar.setDisplayHomeAsUpEnabled(true);
        }

        GridView gridView = findViewById(R.id.grid1);
        ArrayAdapter<String> adapter = new ArrayAdapter<>(
                Account.this,
                R.layout.account_img,
                R.id.textView2,
                array );

        gridView.setAdapter(adapter);


        Button bt = findViewById(R.id.button2);
        bt.setOnClickListener((v)->{
            Intent intent = new Intent(Account.this,Edit.class);
            startActivity(intent);
        });

        gridView.setOnItemClickListener((a,v,i,l)-> {
            Intent intent = new Intent(Account.this,Photo.class);
            intent.putExtra("photo", array[i]);
            startActivity(intent);

        });

    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        if (item.getItemId() == android.R.id.home) {
            this.finish();
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}