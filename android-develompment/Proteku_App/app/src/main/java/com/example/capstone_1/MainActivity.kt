package com.example.capstone_1

import android.content.Context
import android.content.Intent
import android.media.MediaPlayer
import android.net.Uri
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.ImageButton
import com.google.android.material.bottomnavigation.BottomNavigationView
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.setupActionBarWithNavController
import androidx.navigation.ui.setupWithNavController
import com.example.capstone_1.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity(), View.OnClickListener {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val navView: BottomNavigationView = binding.navView

        val navController = findNavController(R.id.nav_host_fragment_activity_main)
        // Passing each menu ID as a set of Ids because each
        // menu should be considered as top level destinations.
        val appBarConfiguration = AppBarConfiguration(
            setOf(
                R.id.navigation_home,
                R.id.navigation_emergencycontact,
                R.id.navigation_reportForm,
                R.id.navigation_profile
            )
        )
        setupActionBarWithNavController(navController, appBarConfiguration)
        navView.setupWithNavController(navController)

        supportActionBar?.hide()

        //val btnDialPhone: Button = findViewById(R.id.bt_emergency_Call)
        //btnDialPhone.setOnClickListener(this)

        //val moveFakeCall: Button = findViewById(R.id.bt_fake)
        //moveFakeCall.setOnClickListener(this)

        //val moveAbout: ImageButton = findViewById(R.id.ib_about)
        //moveAbout.setOnClickListener(this)

        //val moveForm: ImageButton = findViewById((R.id.ib_report_form))
        //moveForm.setOnClickListener(this)

        //val btnSos: Button = findViewById(R.id.bt_sos);
        //var mediaPlayer = MediaPlayer.create(context, R.raw.tolong)
        //mediaPlayer.start() // no need to call prepare(); create() does that for you
        //MediaPlayer = MediaPlayer.create(this, R.raw.tolong);
        //btnSos.setOnClickListener(this)
        //val btnSOS: ImageButton = findViewById(R.id.bt_sos)
        //btnSOS.setOnClickListener(this)


    }


    override fun onClick(v: View) {
        when (v.id) {
            /*R.id.bt_sos -> {
                val mediaPlayer = MediaPlayer.create(this, R.raw.tolong)
                mediaPlayer.start()
            }*/
            /*R.id.bt_fake -> {
                val moveIntent = Intent(this@MainActivity, FakeCallActivity::class.java)
                startActivity(moveIntent)
            }*/
            /*R.id.bt_emergency_Call -> {
                val phoneNumber = "110"
                val dialPhoneIntent = Intent(Intent.ACTION_DIAL, Uri.parse("tel:$phoneNumber"))
                startActivity(dialPhoneIntent)
            }*/
            /*R.id.ib_about -> {
                val moveIntent = Intent(this@MainActivity, AboutActivity::class.java)
                startActivity(moveIntent)
            }
            R.id.ib_report_form -> {
                val moveIntent = Intent(this@MainActivity, FormActivity::class.java)
                startActivity(moveIntent)
            }

            //R.id.bt_sos
            //MediaPlayer.start()
        }
        //return onClick(v)*/
        }
    }
}

