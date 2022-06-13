package com.example.capstone_1

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

class UnderConstructionActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_under_construction)

        supportActionBar?.hide()
    }
}