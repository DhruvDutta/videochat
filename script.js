var peer = new Peer(); 

/*function setid(){
    peer.on('open', function(id) {
        //id = document.getElementById('myid').value;
        console.log('My peer ID is: ' + id);
      });
    
}*/
peer.on('open', function(id) {
  //id = document.getElementById('myid').innerText;
  console.log('My peer ID is: ' + id);
});

function connect(){
    var anotherpeersid = document.getElementById('myid').value
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    getUserMedia({video: true, audio: true}, function(stream) {
      var call = peer.call(anotherpeersid, stream);
      call.on('stream', function(remoteStream) {
        // Show stream in some video/canvas element.
        document.getElementById('video').srcObject = remoteStream;
        document.getElementById('myvideo').srcObject = stream;
      });
    }, function(err) {
      console.log('Failed to get local stream' ,err);
    });
}
peer.on('connection', function(conn) {
    conn.on('data', function(data){
      // Will print 'hi!'
      console.log(data);
    });
  });

var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
peer.on('call', function(call) {
  getUserMedia({video: true, audio: true}, function(stream) {
    call.answer(stream); // Answer the call with an A/V stream.
    call.on('stream', function(remoteStream) {
      document.getElementById('video').srcObject = remoteStream;
      document.getElementById('myvideo').srcObject = stream;
      
    });
  }, function(err) {
    console.log('Failed to get local stream' ,err);
  });
});