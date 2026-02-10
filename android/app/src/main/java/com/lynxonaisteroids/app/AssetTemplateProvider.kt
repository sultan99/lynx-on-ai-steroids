package com.lynxonaisteroids.app

import android.content.Context
import com.lynx.tasm.provider.AbsTemplateProvider
import java.io.ByteArrayOutputStream
import java.io.IOException

class AssetTemplateProvider(context: Context) : AbsTemplateProvider() {

  private val appContext: Context = context.applicationContext

  override fun loadTemplate(uri: String, callback: Callback) {
    Thread {
      try {
        appContext.assets.open(uri).use { inputStream ->
          ByteArrayOutputStream().use { outputStream ->
            val buffer = ByteArray(1024)
            var length: Int
            while (inputStream.read(buffer).also { length = it } != -1) {
              outputStream.write(buffer, 0, length)
            }
            callback.onSuccess(outputStream.toByteArray())
          }
        }
      } catch (e: IOException) {
        callback.onFailed(e.message)
      }
    }.start()
  }
}
