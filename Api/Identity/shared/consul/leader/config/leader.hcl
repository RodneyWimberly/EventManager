server = true
bootstrap_expect = 1
datacenter = "dc"
domain = "em.docker"
data_dir = "/consul/data"
encrypt = "ud0QEPDFulOM+bAcqgtLfpwl7nyPuvIkEgR6OJ5WD4M="
ca_file = "/consul/certs/em.docker-agent-ca.pem"
cert_file = "/consul/certs/dc-server-em.docker-0.pem"
key_file = "/consul/certs/dc-server-em.docker-0-key.pem"
verify_incoming = true
verify_outgoing = true
verify_server_hostname = true
client_addr = "0.0.0.0"
ui_config = {
    enabled = true
}
connect = {
  enabled = true
}
