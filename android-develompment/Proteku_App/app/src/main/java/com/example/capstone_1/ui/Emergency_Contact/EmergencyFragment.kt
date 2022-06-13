package com.example.capstone_1.ui.Emergency_Contact

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.example.capstone_1.databinding.FragmentEmergencyBinding


class EmergencyFragment : Fragment() {

    private var _binding: FragmentEmergencyBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val emergencyViewModel =
            ViewModelProvider(this).get(EmergencyViewModel::class.java)

        _binding = FragmentEmergencyBinding.inflate(inflater, container, false)
        val root: View = binding.root

        val textView: TextView = binding.textEmergencyContact
        emergencyViewModel.text.observe(viewLifecycleOwner) {
            textView.text = it
        }
        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}