package com.example.firsttest;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.provider.MediaStore;
import android.util.Log;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.Toast;

import java.io.FileNotFoundException;
import java.io.InputStream;

public class Edit extends AppCompatActivity {

    ImageView profileImg;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit);

        ActionBar actionBar = getSupportActionBar();
        if (actionBar != null) {
            actionBar.setDisplayHomeAsUpEnabled(true);
        }

        profileImg = findViewById(R.id.profileEdit);
        updateImg();

        Button btnSave = findViewById(R.id.btnSave);
        btnSave.setOnClickListener((v) -> {
            Toast.makeText(this, "Saved", Toast.LENGTH_SHORT).show();
        });

        Button btnCam = findViewById(R.id.btnCam);
        btnCam.setOnClickListener((v) -> {
            openCamera();
        });

        Button btnGal = findViewById(R.id.btnGal);
        btnGal.setOnClickListener((v) -> {
            openGallery();
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

    //---------------------------------------------------------------

    public void openGallery() {
        Intent intent = new Intent(Intent.ACTION_PICK);
        intent.setType("image/*");
        startActivityForResult(intent, 200);
    }


    public void openCamera() {
        checkPermission(Manifest.permission.CAMERA, 100);
    }

    public void updateImg() {
        if (LocalDb.profileImage != null) {
            profileImg.setImageBitmap(LocalDb.profileImage);
        }
    }

    private void checkPermission(String permission, int requestCode) {
        if (ContextCompat.checkSelfPermission(Edit.this, permission) == PackageManager.PERMISSION_DENIED) {
            ActivityCompat.requestPermissions(Edit.this, new String[]{permission}, requestCode);
        } else {
            openCam();
        }
    }

    private void openCam() {
        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        if (intent.resolveActivity(getPackageManager()) != null) {
            startActivityForResult(intent, 100);
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == 100) {
            if (resultCode == RESULT_OK) {
                Bundle extras = data.getExtras();
                LocalDb.profileImage = (Bitmap) extras.get("data");
                updateImg();
            }
        }
        if (requestCode == 200){
            if (resultCode == RESULT_OK) {
            Uri imgData = data.getData();
                InputStream stream = null;
                try {
                    stream = getContentResolver().openInputStream(imgData);
                } catch (FileNotFoundException e) {
                    e.printStackTrace();
                }
                LocalDb.profileImage = BitmapFactory.decodeStream(stream);
                updateImg();
            }
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        switch (requestCode) {
            case 100:
                if (grantResults.length > 0 &&
                        grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    openCam();
                }
                break;
        }

    }
}