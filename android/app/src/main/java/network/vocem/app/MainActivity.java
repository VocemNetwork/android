package network.vocem.app;

import android.os.Bundle;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.BridgeWebViewClient;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

public class MainActivity extends BridgeActivity {
    private String nativeJs;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        nativeJs = loadAsset("vocem-native.js");
        if (getBridge() == null || getBridge().getWebView() == null) return;
        getBridge().getWebView().setWebViewClient(new BridgeWebViewClient(getBridge()) {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                if (nativeJs == null || nativeJs.isEmpty()) return;
                view.evaluateJavascript(nativeJs, null);
            }
        });
    }

    private String loadAsset(String name) {
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(getAssets().open(name), StandardCharsets.UTF_8))) {
            StringBuilder out = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                out.append(line).append('\n');
            }
            return out.toString();
        } catch (Exception ignored) {
            return "";
        }
    }
}
