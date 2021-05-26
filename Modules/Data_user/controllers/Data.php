<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Data extends CI_Controller
{

    public function index()
    {
        $data['title'] = "Halaman Data User";

        $this->load->view('Data_user/index');
    }

    public function pencarian()
    {
        $email = $this->input->post('email');
        $data = $this->db->get_where('user', ['email' => $email])->row_array();

        if (!empty($data)) {
            // Buat sebuah array
            $callback = array(
                'status' => 'success',
                'nama' => $data['nama'],
                'email' => $data['email'],
                'pass' => $data['password'],
                'alamat' => $data['alamat'],
                'notlpn' => $data['notlpn'],
            );
        } else {
            $callback = array('status' => 'failed');
        }

        echo json_encode($callback);
    }
}
