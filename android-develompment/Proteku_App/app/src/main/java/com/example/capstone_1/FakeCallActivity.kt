package com.example.capstone_1

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

class FakeCallActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_fake_call2)

        supportActionBar?.hide()
    }
}