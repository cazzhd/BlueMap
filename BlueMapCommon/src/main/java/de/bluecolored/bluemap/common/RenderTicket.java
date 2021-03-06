package de.bluecolored.bluemap.common;

import java.io.IOException;
import java.util.Objects;

import com.flowpowered.math.vector.Vector2i;

public class RenderTicket {
	
	private final MapType map;
	private final Vector2i tile;
	
	private int renderAttempts;
	private boolean finished;
	
	public RenderTicket(MapType map, Vector2i tile) {
		this.map = map;
		this.tile = tile;
		
		this.renderAttempts = 0;
		this.finished = false;
	}
	
	public synchronized void render() throws IOException {
		renderAttempts++;
		
		if (!finished) {
			map.renderTile(tile);
			
			finished = true;
		}
	}
	
	public MapType getMapType() {
		return map;
	}
	
	public Vector2i getTile() {
		return tile;
	}
	
	public int getRenderAttempts() {
		return renderAttempts;
	}
	
	public boolean isFinished() {
		return finished;
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(map.getId(), tile);
	}
	
	@Override
	public boolean equals(Object other) {
		if (!(other instanceof RenderTicket)) return false;
		RenderTicket ticket = (RenderTicket) other;
		
		if (!ticket.tile.equals(tile)) return false;
		return ticket.map.getId().equals(map.getId());
	}
	
}
