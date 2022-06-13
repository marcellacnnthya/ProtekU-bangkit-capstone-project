package com.example.capstone_1.ui.home

import android.R
import android.content.Intent
import android.media.MediaPlayer
import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageButton
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.example.capstone_1.*
import com.example.capstone_1.databinding.FragmentHomeBinding


class HomeFragment : Fragment() {

    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding!!

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val homeViewModel =
            ViewModelProvider(this).get(HomeViewModel::class.java)

        val textView: TextView = binding.tvGreet
        homeViewModel.text.observe(viewLifecycleOwner) {
            textView.text = it
        }

        /*val one: ImageButton = binding.btSos
        val mp: MediaPlayer = MediaPlayer.create(context, )
        one.setOnClickListener{
            fun onClick(v: View?) {
                mp.start()
            }
        })
binding.btSos.setOnClickListener {
    val mp: MediaPlayer = MediaPlayer
}
        val sos: ImageButton = binding.btSos
        val mp: MediaPlayer =*/

        binding.btEmergencyCall.setOnClickListener {
            val phoneNumber = "110"
            val dialPhoneIntent = Intent(Intent.ACTION_DIAL, Uri.parse("tel:$phoneNumber"))
            startActivity(dialPhoneIntent)
        }
        binding.btFake.setOnClickListener {
            val moveIntent = Intent(requireActivity(), FakeCallActivity::class.java)
            startActivity(moveIntent)
        }
        binding.ibAbout.setOnClickListener {
            val moveAbout = Intent(requireActivity(), AboutActivity::class.java)
            startActivity(moveAbout)
        }
        binding.ibReportForm.setOnClickListener {
            val moveForm = Intent(requireActivity(), FormActivity::class.java)
            startActivity(moveForm)
        }
        binding.btSos.setOnLongClickListener {
            val mediaPlayer = MediaPlayer.create(requireActivity(), com.example.capstone_1.R.raw.tolong)
            mediaPlayer.start()
            true
        }
        binding.ibArticle.setOnClickListener {
            val moveArticle = Intent(requireActivity(), UnderConstructionActivity::class.java)
            startActivity(moveArticle)
        }
        binding.ibMap.setOnClickListener {
            val moveMap = Intent(requireActivity(), UnderConstructionActivity::class.java)
            startActivity(moveMap)
        }
        binding.ibConsul.setOnClickListener {
            val moveConsul = Intent(requireActivity(), UnderConstructionActivity::class.java)
            startActivity(moveConsul)
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?

    ): View{

        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        val root: View = binding.root

        return root
    }
}