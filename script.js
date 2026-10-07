function isValidIP(ip) {

    let parts = ip.split(".");

    if (parts.length !== 4) {
        return false;
    }

    for (let part of parts) {

        if (part === "") {
            return false;
        }

        let number = Number(part);

        if (
            isNaN(number) ||
            number < 0 ||
            number > 255
        ) {
            return false;
        }
    }

    return true;
}


function sendPacket() {

    let sourceIP =
        document.getElementById("sourceIP").value.trim();

    let destinationIP =
        document.getElementById("destinationIP").value.trim();

    let protocol =
        document.getElementById("protocolSelect").value;


    // Validate Source IP

    if (!isValidIP(sourceIP)) {

        alert("❌ Invalid Source IP Address");

        return;
    }


    // Validate Destination IP

    if (!isValidIP(destinationIP)) {

        alert("❌ Invalid Destination IP Address");

        return;
    }


    // Display information

    document.getElementById("protocol").innerText =
        protocol;

    document.getElementById("sourceDisplay").innerText =
        sourceIP;

    document.getElementById("destinationDisplay").innerText =
        destinationIP;

    document.getElementById("statusSource").innerText =
        sourceIP;

    document.getElementById("statusDestination").innerText =
        destinationIP;


    // Routing Decision

    document.getElementById("decisionIP").innerText =
        destinationIP;


    let matchedNetwork;
    let nextHop;
    let interfaceName;
    let route;
    let hopCount;


    if (destinationIP.startsWith("192.168.1.")) {

        matchedNetwork = "192.168.1.0/24";

        nextHop = "Direct";

        interfaceName = "eth0";

        route =
            "Source → Router 1 → Destination";

        hopCount = "1";

    }

    else if (destinationIP.startsWith("192.168.2.")) {

        matchedNetwork = "192.168.2.0/24";

        nextHop = "192.168.1.2";

        interfaceName = "eth1";

        route =
            "Source → Router 1 → Router 2 → Destination";

        hopCount = "2";

    }

    else if (destinationIP.startsWith("192.168.3.")) {

        matchedNetwork = "192.168.3.0/24";

        nextHop = "192.168.2.2";

        interfaceName = "eth2";

        route =
            "Source → Router 1 → Router 2 → Destination";

        hopCount = "2";

    }

    else {

        matchedNetwork = "Default Route";

        nextHop = "192.168.1.254";

        interfaceName = "eth0";

        route =
            "Source → Router 1 → Default Gateway";

        hopCount = "1";

    }


    // Show Routing Decision

    document.getElementById("matchedNetwork").innerText =
        matchedNetwork;

    document.getElementById("nextHop").innerText =
        nextHop;

    document.getElementById("interfaceName").innerText =
        interfaceName;

    document.getElementById("decisionResult").innerText =
        "✅ ROUTING DECISION: FORWARD PACKET";


    // Packet Information

    document.getElementById("hopCount").innerText =
        hopCount;

    document.getElementById("route").innerText =
        route;

    document.getElementById("packetStatus").innerText =
        "📡 Sending Packet...";


    // Network elements

    let packet =
        document.getElementById("packet");

    let router1 =
        document.getElementById("router1");

    let router2 =
        document.getElementById("router2");

    let destination =
        document.getElementById("destination");


    // Reset animation

    packet.className = "";

    packet.style.opacity = "1";

    router1.classList.remove("router-active-1");

    router2.classList.remove("router-active-2");

    destination.classList.remove("destination-active");


    // Router 1

    setTimeout(function () {

        packet.classList.add("packet-move-1");

        router1.classList.add("router-active-1");

        document.getElementById("packetStatus").innerText =
            "🟡 Packet reached Router 1";

    }, 500);


    // Router 2

    setTimeout(function () {

        packet.classList.remove("packet-move-1");

        packet.classList.add("packet-move-2");

        router1.classList.remove("router-active-1");

        router2.classList.add("router-active-2");

        document.getElementById("packetStatus").innerText =
            "🟡 Packet reached Router 2";

    }, 1500);


    // Destination

    setTimeout(function () {

        packet.classList.remove("packet-move-2");

        packet.classList.add("packet-move-3");

        router2.classList.remove("router-active-2");

        destination.classList.add("destination-active");

        document.getElementById("packetStatus").innerText =
            "🟢 Packet Delivered Successfully";

    }, 2500);

}


function resetSimulation() {

    document.getElementById("sourceIP").value =
        "192.168.1.10";

    document.getElementById("destinationIP").value =
        "192.168.3.10";

    document.getElementById("protocolSelect").value =
        "TCP";


    document.getElementById("sourceDisplay").innerText =
        "192.168.1.10";

    document.getElementById("destinationDisplay").innerText =
        "192.168.3.10";


    document.getElementById("statusSource").innerText =
        "-";

    document.getElementById("statusDestination").innerText =
        "-";

    document.getElementById("protocol").innerText =
        "TCP";

    document.getElementById("hopCount").innerText =
        "-";

    document.getElementById("route").innerText =
        "-";

    document.getElementById("packetStatus").innerText =
        "Waiting...";


    // Reset Routing Decision

    document.getElementById("decisionIP").innerText =
        "-";

    document.getElementById("matchedNetwork").innerText =
        "-";

    document.getElementById("nextHop").innerText =
        "-";

    document.getElementById("interfaceName").innerText =
        "-";

    document.getElementById("decisionResult").innerText =
        "Waiting for packet...";


    // Reset network animation

    let packet =
        document.getElementById("packet");

    let router1 =
        document.getElementById("router1");

    let router2 =
        document.getElementById("router2");

    let destination =
        document.getElementById("destination");


    packet.className = "";

    packet.style.opacity = "0";

    router1.classList.remove("router-active-1");

    router2.classList.remove("router-active-2");

    destination.classList.remove("destination-active");

}